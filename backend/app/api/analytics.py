from pathlib import Path

import pandas as pd
from fastapi import APIRouter

router = APIRouter(
    prefix="/api/analytics",
    tags=["Analytics"]
)

PROJECT_ROOT = Path(
    __file__
).resolve().parents[3]

STUDENTS_PATH = (
    PROJECT_ROOT
    / "ml"
    / "data"
    / "students.csv"
)

CLUSTERS_PATH = (
    PROJECT_ROOT
    / "ml"
    / "data"
    / "student_clusters.csv"
)

EVALUATION_PATH = (
    PROJECT_ROOT
    / "ml"
    / "visualizations"
    / "cluster_evaluation.csv"
)

CLUSTER_NAMES = {
    0: "AI & Data Explorer",
    1: "Digital Builder",
    2: "IoT & Cyber Explorer"
}


@router.get("/summary")
def get_analytics_summary():

    if not STUDENTS_PATH.exists():
        raise FileNotFoundError(
            f"Students dataset not found: {STUDENTS_PATH}"
        )

    if not CLUSTERS_PATH.exists():
        raise FileNotFoundError(
            f"Cluster dataset not found: {CLUSTERS_PATH}"
        )

    students_df = pd.read_csv(
        STUDENTS_PATH
    )

    clusters_df = pd.read_csv(
        CLUSTERS_PATH
    )

    total_students = len(
        students_df
    )

    average_age = round(
        float(students_df["age"].mean()),
        2
    )

    skill_distribution = (
        students_df["skill_level"]
        .value_counts()
        .to_dict()
    )

    if "cluster" not in clusters_df.columns:
        raise ValueError(
            "The student_clusters.csv file does not contain a 'cluster' column."
        )

    cluster_distribution = (
        clusters_df["cluster"]
        .value_counts()
        .sort_index()
        .to_dict()
    )

    named_clusters = {}

    for cluster, count in cluster_distribution.items():

        cluster_number = int(cluster)

        named_clusters[
            CLUSTER_NAMES.get(
                cluster_number,
                f"Student Segment {cluster_number}"
            )
        ] = int(count)

    model_performance = []

    if EVALUATION_PATH.exists():

        evaluation_df = pd.read_csv(
            EVALUATION_PATH
        )

        for _, row in evaluation_df.iterrows():

            model_performance.append({
                "k": int(row["k"]),
                "inertia": round(
                    float(row["inertia"]),
                    2
                ),
                "silhouette_score": round(
                    float(row["silhouette_score"]),
                    3
                )
            })

    best_k = None
    best_silhouette = None

    if model_performance:

        best_model = max(
            model_performance,
            key=lambda item: item["silhouette_score"]
        )

        best_k = best_model["k"]
        best_silhouette = best_model["silhouette_score"]

    return {
        "total_students": total_students,
        "average_age": average_age,
        "cluster_distribution": cluster_distribution,
        "cluster_names": named_clusters,
        "skill_distribution": skill_distribution,
        "model_performance": model_performance,
        "best_k": best_k,
        "best_silhouette_score": best_silhouette
    }