import pandas as pd
from pathlib import Path


PROJECT_ROOT = Path(
    __file__
).resolve().parent.parent


COURSE_PATH = (
    PROJECT_ROOT
    / "ml"
    / "courses"
    / "courses.csv"
)


courses = pd.read_csv(
    COURSE_PATH
)


SKILL_LEVELS = {
    "Beginner": 1,
    "Intermediate": 2,
    "Advanced": 3
}


def calculate_course_score(
    course,
    interests,
    skill_level,
    course_type,
    duration,
    segment
):
    """
    Calculate how well a course matches
    the student's profile.
    """

    score = 0

    reasons = []

    student_skill = SKILL_LEVELS.get(
        skill_level,
        1
    )

    # -----------------------------------------
    # Interest Match
    # -----------------------------------------

    if course["category"] in interests:

        score += 40

        reasons.append(
            f"Matches your interest in "
            f"{course['category']}"
        )

    # -----------------------------------------
    # Skill Match
    # -----------------------------------------

    course_skill = SKILL_LEVELS.get(
        course["skill_level"],
        1
    )

    skill_difference = abs(
        student_skill -
        course_skill
    )

    if skill_difference == 0:

        score += 25

        reasons.append(
            f"Suitable for your "
            f"{skill_level.lower()} "
            f"skill level"
        )

    elif skill_difference == 1:

        score += 15

        reasons.append(
            "Provides a suitable "
            "learning progression"
        )

    else:

        score += 5

    # -----------------------------------------
    # Course Type
    # -----------------------------------------

    if course["course_type"] == course_type:

        score += 20

        reasons.append(
            f"Matches your preference "
            f"for {course_type.lower()}"
        )

    # -----------------------------------------
    # Duration
    # -----------------------------------------

    if course["duration"] == duration:

        score += 10

        reasons.append(
            "Matches your preferred duration"
        )

    # -----------------------------------------
    # Course Rating
    # -----------------------------------------

    score += float(
        course["rating"]
    )

    # -----------------------------------------
    # Segment Bonus
    # -----------------------------------------

    if segment == "AI & Data Explorer":

        if course["category"] in [
            "Artificial Intelligence",
            "Machine Learning",
            "Data Science"
        ]:

            score += 10

            reasons.append(
                "Strong match for your "
                "AI and Data learner segment"
            )

    elif segment == "Digital Builder":

        if course["category"] in [
            "Web Development",
            "App Development",
            "Cloud Computing"
        ]:

            score += 10

            reasons.append(
                "Strong match for your "
                "Digital Builder segment"
            )

    elif segment == "IoT & Cyber Explorer":

        if course["category"] in [
            "IoT",
            "Cybersecurity",
            "Cloud Computing"
        ]:

            score += 10

            reasons.append(
                "Strong match for your "
                "IoT and Cybersecurity segment"
            )

    return (
        round(float(score), 2),
        reasons
    )


def recommend_courses(
    interests,
    skill_level,
    course_type,
    duration,
    segment,
    top_n=5
):
    """
    Generate personalized course recommendations.

    Platform diversity rule:
    Maximum 2 recommendations from
    the same learning platform.
    """

    scored_courses = []

    # -----------------------------------------
    # Score Every Course
    # -----------------------------------------

    for _, course in courses.iterrows():

        score, reasons = calculate_course_score(
            course=course,
            interests=interests,
            skill_level=skill_level,
            course_type=course_type,
            duration=duration,
            segment=segment
        )

        scored_courses.append({

            "course_id":
                str(course["id"]),

            "title":
                course["title"],

            "category":
                course["category"],

            "skill_level":
                course["skill_level"],

            "course_type":
                course["course_type"],

            "duration":
                course["duration"],

            "rating":
                float(course["rating"]),

            "score":
                score,

            "reason":
                reasons[0]
                if reasons
                else
                "Recommended based on "
                "your overall profile",

            "platform":
                course["platform"],

            "platform_url":
                course["platform_url"]
        })

    # -----------------------------------------
    # Sort by Relevance
    # -----------------------------------------

    scored_courses.sort(
        key=lambda item:
        item["score"],
        reverse=True
    )

    # -----------------------------------------
    # Platform Diversity
    # -----------------------------------------

    selected_courses = []

    platform_counts = {}

    MAX_PER_PLATFORM = 2

    for course in scored_courses:

        platform = course["platform"]

        current_count = (
            platform_counts.get(
                platform,
                0
            )
        )

        if current_count >= MAX_PER_PLATFORM:
            continue

        selected_courses.append(
            course
        )

        platform_counts[platform] = (
            current_count + 1
        )

        if len(selected_courses) >= top_n:
            break

    # -----------------------------------------
    # Fallback
    # -----------------------------------------

    # If there are not enough different
    # platforms to fill the requested number,
    # return the best available courses.

    if len(selected_courses) < top_n:

        selected_ids = {
            course["course_id"]
            for course in selected_courses
        }

        for course in scored_courses:

            if (
                course["course_id"]
                in selected_ids
            ):
                continue

            selected_courses.append(
                course
            )

            if len(selected_courses) >= top_n:
                break

    return selected_courses[:top_n]


if __name__ == "__main__":

    print(
        "======================================"
    )

    print(
        "COURSE RECOMMENDATION TEST"
    )

    print(
        "======================================"
    )

    results = recommend_courses(

        interests=[
            "Artificial Intelligence",
            "Machine Learning",
            "Data Science"
        ],

        skill_level="Advanced",

        course_type="Interactive",

        duration="Long (3+ months)",

        segment="AI & Data Explorer",

        top_n=5
    )

    print(
        "\nRecommended courses:\n"
    )

    for index, course in enumerate(
        results,
        start=1
    ):

        print(
            f"{index}. "
            f"{course['title']}"
        )

        print(
            f"   Category: "
            f"{course['category']}"
        )

        print(
            f"   Score: "
            f"{course['score']}"
        )

        print(
            f"   Rating: "
            f"{course['rating']}"
        )

        print(
            f"   Platform: "
            f"{course['platform']}"
        )

        print(
            f"   Link: "
            f"{course['platform_url']}"
        )

        print(
            f"   Why: "
            f"{course['reason']}"
        )

        print()

    print(
        "Recommendation engine test completed."
    )