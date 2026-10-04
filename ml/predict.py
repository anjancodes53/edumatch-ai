import pickle
import pandas as pd

from pathlib import Path


# ==================================================
# PROJECT PATH
# ==================================================

PROJECT_ROOT = Path(__file__).resolve().parent.parent


# ==================================================
# MODEL PATHS
# ==================================================

MODEL_PATH = (
    PROJECT_ROOT
    / "ml"
    / "models"
    / "kmeans_model.pkl"
)

SCALER_PATH = (
    PROJECT_ROOT
    / "ml"
    / "models"
    / "scaler.pkl"
)

PREPROCESSOR_PATH = (
    PROJECT_ROOT
    / "ml"
    / "models"
    / "preprocessor.pkl"
)


# ==================================================
# CHECK FILES
# ==================================================

if not MODEL_PATH.exists():
    raise FileNotFoundError(
        f"K-Means model not found: {MODEL_PATH}"
    )

if not SCALER_PATH.exists():
    raise FileNotFoundError(
        f"Scaler not found: {SCALER_PATH}"
    )

if not PREPROCESSOR_PATH.exists():
    raise FileNotFoundError(
        f"Preprocessor not found: {PREPROCESSOR_PATH}"
    )


# ==================================================
# LOAD ML COMPONENTS
# ==================================================

with open(MODEL_PATH, "rb") as file:
    kmeans = pickle.load(file)

with open(SCALER_PATH, "rb") as file:
    scaler = pickle.load(file)

with open(PREPROCESSOR_PATH, "rb") as file:
    preprocessor = pickle.load(file)


# ==================================================
# CLUSTER NAMES
# ==================================================

CLUSTER_NAMES = {
    0: "AI & Data Explorer",
    1: "Digital Builder",
    2: "IoT & Cyber Explorer"
}


# ==================================================
# INTERESTS
# ==================================================

INTEREST_LIST = [
    "Artificial Intelligence",
    "Machine Learning",
    "Web Development",
    "Data Science",
    "IoT",
    "Cybersecurity",
    "Cloud Computing",
    "App Development"
]


# ==================================================
# SKILL MAPPING
# ==================================================

SKILL_MAPPING = {
    "Beginner": 1,
    "Intermediate": 2,
    "Advanced": 3
}


# ==================================================
# PREDICT CLUSTER
# ==================================================

def predict_cluster(
    age,
    skill_level,
    interests,
    course_type,
    duration
):

    if skill_level not in SKILL_MAPPING:
        raise ValueError(
            f"Invalid skill level: {skill_level}"
        )

    skill_level_encoded = SKILL_MAPPING[
        skill_level
    ]


    # ----------------------------------------------
    # Create student row
    # ----------------------------------------------

    row = {
        "age": age,
        "skill_level_encoded": skill_level_encoded,
        "course_type": course_type,
        "duration": duration
    }


    # ----------------------------------------------
    # Add interest features
    # ----------------------------------------------

    for interest in INTEREST_LIST:

        column_name = (
            interest
            .lower()
            .replace(" ", "_")
            .replace("/", "_")
        )

        row[column_name] = (
            1 if interest in interests else 0
        )


    # ----------------------------------------------
    # DataFrame
    # ----------------------------------------------

    student_df = pd.DataFrame([row])


    # ----------------------------------------------
    # Feature order
    # ----------------------------------------------

    interest_columns = [
        interest
        .lower()
        .replace(" ", "_")
        .replace("/", "_")
        for interest in INTEREST_LIST
    ]

    feature_columns = [
        "age",
        "skill_level_encoded",
        "course_type",
        "duration"
    ]

    feature_columns += interest_columns

    student_df = student_df[
        feature_columns
    ]


    # ----------------------------------------------
    # Preprocessing
    # ----------------------------------------------

    transformed = preprocessor.transform(
        student_df
    )


    # ----------------------------------------------
    # Scaling
    # ----------------------------------------------

    transformed_scaled = scaler.transform(
        transformed
    )


    # ----------------------------------------------
    # Prediction
    # ----------------------------------------------

    cluster = int(
        kmeans.predict(
            transformed_scaled
        )[0]
    )


    # ----------------------------------------------
    # Segment
    # ----------------------------------------------

    segment = CLUSTER_NAMES.get(
        cluster,
        f"Student Segment {cluster}"
    )


    return {
        "cluster": cluster,
        "segment": segment
    }


# ==================================================
# TEST
# ==================================================

if __name__ == "__main__":

    print("======================================")
    print("ML PREDICTION TEST")
    print("======================================")

    result = predict_cluster(
        age=22,
        skill_level="Advanced",
        interests=[
            "Artificial Intelligence",
            "Machine Learning"
        ],
        course_type="Interactive",
        duration="Long (3+ months)"
    )

    print("\nPrediction result:")
    print(result)

    print("\nPrediction test completed successfully.")