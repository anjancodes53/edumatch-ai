import pandas as pd
import pickle

from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler


# ==================================================
# 1. LOAD DATASET
# ==================================================

input_path = "ml/data/students.csv"

df = pd.read_csv(input_path)

print("======================================")
print("FEATURE ENGINEERING")
print("======================================")

print(f"Students: {len(df)}")


# ==================================================
# 2. INTEREST FEATURES
# ==================================================

interest_list = [
    "Artificial Intelligence",
    "Machine Learning",
    "Web Development",
    "Data Science",
    "IoT",
    "Cybersecurity",
    "Cloud Computing",
    "App Development"
]

for interest in interest_list:

    column_name = (
        interest
        .lower()
        .replace(" ", "_")
        .replace("/", "_")
    )

    df[column_name] = df["interests"].apply(
        lambda x: 1 if interest in x else 0
    )


# ==================================================
# 3. SKILL LEVEL ENCODING
# ==================================================

skill_mapping = {
    "Beginner": 1,
    "Intermediate": 2,
    "Advanced": 3
}

df["skill_level_encoded"] = (
    df["skill_level"].map(skill_mapping)
)


# ==================================================
# 4. DEFINE FEATURES
# ==================================================

numeric_features = [
    "age",
    "skill_level_encoded"
]

categorical_features = [
    "course_type",
    "duration"
]

interest_features = [
    interest
    .lower()
    .replace(" ", "_")
    .replace("/", "_")
    for interest in interest_list
]


# ==================================================
# 5. CREATE PREPROCESSOR
# ==================================================

preprocessor = ColumnTransformer(
    transformers=[
        (
            "numeric",
            StandardScaler(),
            numeric_features
        ),

        (
            "categorical",
            OneHotEncoder(
                handle_unknown="ignore",
                sparse_output=False
            ),
            categorical_features
        )
    ],

    remainder="passthrough"
)


# ==================================================
# 6. CREATE INPUT FEATURES
# ==================================================

feature_columns = (
    numeric_features
    + categorical_features
    + interest_features
)

X = df[feature_columns]


# ==================================================
# 7. TRANSFORM FEATURES
# ==================================================

X_transformed = preprocessor.fit_transform(X)


# ==================================================
# 8. GET FEATURE NAMES
# ==================================================

feature_names = (
    preprocessor.get_feature_names_out()
)


# ==================================================
# 9. CREATE FEATURE DATAFRAME
# ==================================================

X_final = pd.DataFrame(
    X_transformed,
    columns=feature_names
)


# ==================================================
# 10. SAVE FEATURE DATASET
# ==================================================

output_path = "ml/data/student_features.csv"

X_final.to_csv(
    output_path,
    index=False
)


# ==================================================
# 11. SAVE PREPROCESSOR
# ==================================================

preprocessor_path = "ml/models/preprocessor.pkl"

with open(preprocessor_path, "wb") as file:
    pickle.dump(
        preprocessor,
        file
    )


# ==================================================
# 12. DISPLAY RESULTS
# ==================================================

print("\nFeature columns:")

for column in X_final.columns:
    print(column)

print("\nFeature dataset shape:")
print(X_final.shape)

print("\nFirst 5 rows:")
print(X_final.head())

print("\n======================================")
print("FILES CREATED")
print("======================================")

print(
    f"Feature dataset: {output_path}"
)

print(
    f"Preprocessor: {preprocessor_path}"
)

print("\nFeature engineering completed successfully.")