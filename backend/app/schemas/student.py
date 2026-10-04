from typing import List

from pydantic import BaseModel, Field


class StudentProfile(BaseModel):

    name: str = Field(
        ...,
        min_length=1
    )

    age: int = Field(
        ...,
        ge=13,
        le=100
    )

    skill_level: str

    interests: List[str]

    course_type: str

    duration: str


class CourseRecommendation(BaseModel):

    course_id: str

    title: str

    category: str

    skill_level: str

    course_type: str

    duration: str

    rating: float

    score: float

    reason: str

    platform: str

    platform_url: str


class StudentAnalysisResponse(BaseModel):

    message: str

    student: StudentProfile

    segment: str

    recommendations: List[
        CourseRecommendation
    ]