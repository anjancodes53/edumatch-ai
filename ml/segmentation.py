import pickle
import pandas as pd

from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score


# ==================================================
# 1. LOAD FEATURE DATA
# ==================================================

input_path = "ml/data/student_features.csv"

df = pd.read_csv(input_path)

print("======================================")
print("K-MEANS STUDENT SEGMENTATION")
print("======================================")

print(f"Students: {len(df)}")
print(f"Features: {df.shape[1]}")


# ==================================================
# 2. SCALE FEATURES
# ==================================================

scaler = StandardScaler()

X_scaled = scaler.fit_transform(df)

print("\nFeatures scaled successfully.")


# ==================================================
# 3. TEST DIFFERENT K VALUES
# ==================================================

print("\nTesting different numbers of clusters...\n")

inertias = []
silhouette_scores = []

k_values = range(2, 9)

for k in k_values:

    model = KMeans(
        n_clusters=k,
        random_state=42,
        n_init=10
    )

    labels = model.fit_predict(X_scaled)

    inertia = model.inertia_

    silhouette = silhouette_score(
        X_scaled,
        labels
    )

    inertias.append(inertia)
    silhouette_scores.append(silhouette)

    print(
        f"K={k} | "
        f"Inertia={inertia:.2f} | "
        f"Silhouette={silhouette:.3f}"
    )


# ==================================================
# 4. SELECT BEST K
# ==================================================

best_index = silhouette_scores.index(
    max(silhouette_scores)
)

best_k = list(k_values)[best_index]


print("\n--------------------------------")
print(
    f"Recommended number of clusters: {best_k}"
)
print("--------------------------------")


# ==================================================
# 5. TRAIN FINAL K-MEANS
# ==================================================

kmeans = KMeans(
    n_clusters=best_k,
    random_state=42,
    n_init=10
)

cluster_labels = kmeans.fit_predict(
    X_scaled
)


# ==================================================
# 6. ADD CLUSTERS
# ==================================================

df["cluster"] = cluster_labels


# ==================================================
# 7. DISPLAY CLUSTER DISTRIBUTION
# ==================================================

print("\nCluster distribution:")

print(
    df["cluster"]
    .value_counts()
    .sort_index()
)


# ==================================================
# 8. SAVE CLUSTER DATA
# ==================================================

output_path = (
    "ml/data/student_clusters.csv"
)

df.to_csv(
    output_path,
    index=False
)


# ==================================================
# 9. SAVE K-MEANS MODEL
# ==================================================

model_path = (
    "ml/models/kmeans_model.pkl"
)

with open(model_path, "wb") as file:

    pickle.dump(
        kmeans,
        file
    )


# ==================================================
# 10. SAVE SCALER
# ==================================================

scaler_path = (
    "ml/models/scaler.pkl"
)

with open(scaler_path, "wb") as file:

    pickle.dump(
        scaler,
        file
    )


# ==================================================
# 11. FINISHED
# ==================================================

print("\n================================")
print("FILES CREATED")
print("================================")

print(
    f"Dataset: {output_path}"
)

print(
    f"K-Means model: {model_path}"
)

print(
    f"Scaler: {scaler_path}"
)

print(
    "\nK-Means training completed successfully."
)