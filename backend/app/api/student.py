import json
import sys

from pathlib import Path

from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session


# ==================================================
# PROJECT ROOT
# ==================================================

PROJECT_ROOT = Path(
    __file__
).resolve().parents[3]

if str(PROJECT_ROOT) not in sys.path:
    sys.path.append(str(PROJECT_ROOT))


# ==================================================
# ML IMPORTS
# ==================================================

from ml.predict import predict_cluster

from ml.recommend import recommend_courses


# ==================================================
# BACKEND IMPORTS
# ==================================================

from app.db.database import get_db

from app.models.student import Student

from app.schemas.student import (
    StudentProfile,
    StudentAnalysisResponse,
)


# ==================================================
# ROUTER
# ==================================================

router = APIRouter(
    prefix="/api/student",
    tags=["Student"]
)


# ==================================================
# ANALYZE STUDENT
# ==================================================

@router.post(
    "/analyze",
    response_model=StudentAnalysisResponse
)
def analyze_student(
    profile: StudentProfile,
    db: Session = Depends(get_db)
):

    # ------------------------------------------------
    # 1. Save interests
    # ------------------------------------------------

    interests_json = json.dumps(
        profile.interests
    )


    # ------------------------------------------------
    # 2. Save student to database
    # ------------------------------------------------

    student = Student(

        name=profile.name,

        age=profile.age,

        skill_level=profile.skill_level,

        interests=interests_json,

        course_type=profile.course_type,

        duration=profile.duration,
    )


    db.add(student)

    db.commit()

    db.refresh(student)


    # ------------------------------------------------
    # 3. ML SEGMENTATION
    # ------------------------------------------------

    prediction = predict_cluster(

        age=profile.age,

        skill_level=profile.skill_level,

        interests=profile.interests,

        course_type=profile.course_type,

        duration=profile.duration
    )


    segment = prediction["segment"]


    # ------------------------------------------------
    # 4. COURSE RECOMMENDATIONS
    # ------------------------------------------------

    recommendations = recommend_courses(

        interests=profile.interests,

        skill_level=profile.skill_level,

        course_type=profile.course_type,

        duration=profile.duration,

        segment=segment,

        top_n=5
    )


    # ------------------------------------------------
    # 5. RETURN RESPONSE
    # ------------------------------------------------

    return {

        "message":
            "Student profile analyzed successfully",

        "student":
            profile,

        "segment":
            segment,

        "recommendations":
            recommendations
    }