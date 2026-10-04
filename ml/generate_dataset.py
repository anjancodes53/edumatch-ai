import random
import pandas as pd

random.seed(42)

# --------------------------------------------------
# Student archetypes
# --------------------------------------------------

profiles = {
    "AI_ML": {
        "interests": [
            "Artificial Intelligence",
            "Machine Learning",
            "Data Science"
        ],
        "course_types": ["Interactive", "Project Based"],
        "durations": ["Medium (1-3 months)", "Long (3+ months)"],
        "skill_levels": ["Intermediate", "Advanced"]
    },

    "WEB": {
        "interests": [
            "Web Development",
            "App Development",
            "Cloud Computing"
        ],
        "course_types": ["Project Based", "Video Courses"],
        "durations": ["Short (< 4 weeks)", "Medium (1-3 months)"],
        "skill_levels": ["Beginner", "Intermediate"]
    },

    "DATA": {
        "interests": [
            "Data Science",
            "Machine Learning",
            "Artificial Intelligence"
        ],
        "course_types": ["Theory Focused", "Interactive"],
        "durations": ["Medium (1-3 months)", "Long (3+ months)"],
        "skill_levels": ["Intermediate", "Advanced"]
    },

    "IOT_CLOUD": {
        "interests": [
            "IoT",
            "Cloud Computing",
            "Cybersecurity"
        ],
        "course_types": ["Project Based", "Interactive"],
        "durations": ["Medium (1-3 months)", "Long (3+ months)"],
        "skill_levels": ["Intermediate", "Advanced"]
    }
}


# --------------------------------------------------
# Generate students
# --------------------------------------------------

rows = []

for i in range(1, 201):

    profile_name = random.choice(list(profiles.keys()))
    profile = profiles[profile_name]

    age = random.randint(18, 28)

    skill_level = random.choice(
        profile["skill_levels"]
    )

    number_of_interests = random.randint(2, 3)

    student_interests = random.sample(
        profile["interests"],
        min(
            number_of_interests,
            len(profile["interests"])
        )
    )

    course_type = random.choice(
        profile["course_types"]
    )

    duration = random.choice(
        profile["durations"]
    )

    rows.append({
        "name": f"Student_{i}",
        "age": age,
        "skill_level": skill_level,
        "interests": ", ".join(student_interests),
        "course_type": course_type,
        "duration": duration
    })


# --------------------------------------------------
# Create DataFrame
# --------------------------------------------------

df = pd.DataFrame(rows)


# --------------------------------------------------
# Save dataset
# --------------------------------------------------

output_path = "ml/data/students.csv"

df.to_csv(
    output_path,
    index=False
)


print("====================================")
print("Dataset generated successfully!")
print("====================================")

print(f"\nNumber of students: {len(df)}")

print("\nStudent profile distribution:")
print(df["skill_level"].value_counts())

print("\nCourse type distribution:")
print(df["course_type"].value_counts())

print("\nFirst 5 students:")
print(df.head())

print(f"\nDataset saved to:")
print(output_path)