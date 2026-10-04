import pandas as pd
import matplotlib.pyplot as plt

from pathlib import Path
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import StandardScaler


# ==================================================
# PROJECT PATHS
# ==================================================

PROJECT_ROOT = Path(__file__).resolve().parent

DATA_PATH = (
    PROJECT_ROOT
    / "data"
    / "student_features.csv"
)

OUTPUT_DIR = (
    PROJECT_ROOT
    / "visualizations"
)

OUTPUT_DIR.mkdir(
    exist_ok=True
)


# ==================================================
# LOAD DATA
# ==================================================

print("======================================")
print("K-MEANS VISUALIZATION")
print("======================================")

df = pd.read_csv(
    DATA_PATH
)

print(
    f"Dataset shape: {df.shape}"
)


# ==================================================
# SCALE FEATURES
# ==================================================

scaler = StandardScaler()

X = scaler.fit_transform(df)


# ==================================================
# TEST DIFFERENT K VALUES
# ==================================================

k_values = range(2, 9)

inertias = []

silhouette_scores = []


for k in k_values:

    model = KMeans(
        n_clusters=k,
        random_state=42,
        n_init=10
    )

    labels = model.fit_predict(X)

    inertia = model.inertia_

    silhouette = silhouette_score(
        X,
        labels
    )

    inertias.append(
        inertia
    )

    silhouette_scores.append(
        silhouette
    )

    print(
        f"K={k} | "
        f"Inertia={inertia:.2f} | "
        f"Silhouette={silhouette:.3f}"
    )


# ==================================================
# BEST K
# ==================================================

best_index = silhouette_scores.index(
    max(silhouette_scores)
)

best_k = list(k_values)[
    best_index
]

print()
print(
    f"Best K according to silhouette score: {best_k}"
)


# ==================================================
# ELBOW CURVE
# ==================================================

plt.figure(
    figsize=(9, 6)
)

plt.plot(
    list(k_values),
    inertias,
    marker="o"
)

plt.xlabel(
    "Number of Clusters (K)"
)

plt.ylabel(
    "Inertia"
)

plt.title(
    "K-Means Elbow Curve"
)

plt.xticks(
    list(k_values)
)

plt.grid(
    alpha=0.3
)

plt.tight_layout()


elbow_path = (
    OUTPUT_DIR
    / "elbow_curve.png"
)

plt.savefig(
    elbow_path,
    dpi=200
)

plt.close()


# ==================================================
# SILHOUETTE SCORE
# ==================================================

plt.figure(
    figsize=(9, 6)
)

plt.plot(
    list(k_values),
    silhouette_scores,
    marker="o"
)

plt.axvline(
    best_k,
    linestyle="--",
    label=f"Best K = {best_k}"
)

plt.xlabel(
    "Number of Clusters (K)"
)

plt.ylabel(
    "Silhouette Score"
)

plt.title(
    "K-Means Silhouette Score"
)

plt.xticks(
    list(k_values)
)

plt.legend()

plt.grid(
    alpha=0.3
)

plt.tight_layout()


silhouette_path = (
    OUTPUT_DIR
    / "silhouette_score.png"
)

plt.savefig(
    silhouette_path,
    dpi=200
)

plt.close()


# ==================================================
# SAVE RESULTS
# ==================================================

results = pd.DataFrame({
    "k": list(k_values),
    "inertia": inertias,
    "silhouette_score": silhouette_scores
})


results_path = (
    OUTPUT_DIR
    / "cluster_evaluation.csv"
)

results.to_csv(
    results_path,
    index=False
)


# ==================================================
# COMPLETE
# ==================================================

print()
print("======================================")
print("FILES CREATED")
print("======================================")

print(
    f"Elbow curve: {elbow_path}"
)

print(
    f"Silhouette chart: {silhouette_path}"
)

print(
    f"Evaluation data: {results_path}"
)

print()
print(
    "Cluster visualization completed successfully."
)