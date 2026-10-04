import pandas as pd


# --------------------------------------------------
# 1. Load original dataset
# --------------------------------------------------

dataset_path = "ml/data/students.csv"
clusters_path = "ml/data/student_clusters.csv"

students = pd.read_csv(dataset_path)
clusters = pd.read_csv(clusters_path)


# --------------------------------------------------
# 2. Add cluster labels to original data
# --------------------------------------------------

students["cluster"] = clusters["cluster"]


print("======================================")
print("STUDENT CLUSTER ANALYSIS")
print("======================================")


# --------------------------------------------------
# 3. Analyze each cluster
# --------------------------------------------------

for cluster_id in sorted(students["cluster"].unique()):

    cluster_data = students[
        students["cluster"] == cluster_id
    ]

    print("\n--------------------------------------")
    print(f"CLUSTER {cluster_id}")
    print("--------------------------------------")

    print(
        f"Number of students: {len(cluster_data)}"
    )

    print(
        f"Average age: "
        f"{cluster_data['age'].mean():.1f}"
    )

    print("\nSkill levels:")

    print(
        cluster_data["skill_level"]
        .value_counts()
        .to_string()
    )

    print("\nCourse types:")

    print(
        cluster_data["course_type"]
        .value_counts()
        .to_string()
    )

    print("\nDurations:")

    print(
        cluster_data["duration"]
        .value_counts()
        .to_string()
    )

    # ----------------------------------------------
    # Interests
    # ----------------------------------------------

    print("\nInterests:")

    all_interests = []

    for interests in cluster_data["interests"]:
        all_interests.extend(
            interests.split(", ")
        )

    interest_counts = pd.Series(
        all_interests
    ).value_counts()

    print(
        interest_counts.to_string()
    )


# --------------------------------------------------
# 4. Overall summary
# --------------------------------------------------

print("\n======================================")
print("CLUSTER SUMMARY")
print("======================================")

summary = (
    students
    .groupby("cluster")
    .agg(
        students=("name", "count"),
        average_age=("age", "mean")
    )
)

print(summary)


print("\nCluster analysis completed successfully.")