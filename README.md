<p align="center">
  <img src="https://raw.githubusercontent.com/anjancodes53/edumatch-ai/main/docs/edumatch-banner.png" alt="EduMatch AI Banner" width="100%">
</p>

<h1 align="center">⚡ EduMatch AI</h1>

<p align="center">
  <strong>Student Segmentation & Personalized Learning Recommendation System</strong>
</p>

<p align="center">
  <em>Analyze. Segment. Learn Smarter.</em>
</p>

<p align="center">
  An ML-powered full-stack application that analyzes student profiles, identifies learner segments using K-Means clustering, and generates personalized course recommendations.
</p>

<p align="center">
  <a href="https://edumatch-ai-two.vercel.app">🚀 Launch Application</a> •
  <a href="https://edumatch-ai-backend-pn11.onrender.com/docs">📚 API Documentation</a>
</p>

---

## ✨ What is EduMatch AI?

EduMatch AI is a full-stack machine learning application designed to help students discover learning opportunities that match their individual profiles.

The system takes a student's:

- Age
- Skill level
- Interests
- Preferred course type
- Preferred duration

and processes this information through a machine-learning pipeline to:

1. Engineer meaningful student features
2. Preprocess and scale the features
3. Segment students using K-Means clustering
4. Identify the learner's segment
5. Score available courses
6. Generate personalized course recommendations

### Complete Flow

```text
Student Profile
      │
      ▼
Feature Engineering
      │
      ▼
Preprocessing & Scaling
      │
      ▼
K-Means Clustering
      │
      ▼
Learner Segment
      │
      ▼
Recommendation Engine
      │
      ▼
Personalized Learning Path
```

---

## 🚀 Key Features

- 🎓 Student profile analysis
- 🧠 K-Means learner segmentation
- 📊 Cluster evaluation using inertia and silhouette score
- 🎯 Personalized course recommendations
- 🔎 Interest, skill-level, course-type and duration matching
- 🧩 Segment-aware recommendation scoring
- 🌐 Full-stack React + FastAPI architecture
- 💾 SQLite database for student profile persistence
- 📈 Analytics API
- ☁️ Production deployment using Vercel and Render

---

## 🖥️ Screenshots

### Landing Page

<p align="center">
  <img src="https://raw.githubusercontent.com/anjancodes53/edumatch-ai/main/docs/screenshots/landing-page.png" alt="EduMatch AI Landing Page" width="90%">
</p>

### Student Profile

<p align="center">
  <img src="https://raw.githubusercontent.com/anjancodes53/edumatch-ai/main/docs/screenshots/student-profile.png" alt="Student Profile Form" width="90%">
</p>

### Learning Preferences

<p align="center">
  <img src="https://raw.githubusercontent.com/anjancodes53/edumatch-ai/main/docs/screenshots/learning-preferences.png" alt="Learning Preferences" width="90%">
</p>

### Personalized Recommendations

<p align="center">
  <img src="https://raw.githubusercontent.com/anjancodes53/edumatch-ai/main/docs/screenshots/recommendations.png" alt="Course Recommendations" width="90%">
</p>

---

## 🧠 Machine Learning

### Dataset

The project uses a synthetic dataset containing **200 student profiles**, generated with a fixed random seed of 42.

The dataset represents correlated learner archetypes including:

- AI / Machine Learning
- Data Science
- Web Development
- App Development
- IoT
- Cloud Computing
- Cybersecurity

### K-Means Evaluation

Several cluster counts were evaluated using inertia and silhouette score.

| K | Inertia | Silhouette Score |
|---:|---:|---:|
| 2 | 1453.35 | 0.380 |
| **3** | **867.01** | **0.481** |
| 4 | 788.86 | 0.318 |
| 5 | 731.98 | 0.331 |
| 6 | 692.72 | 0.250 |
| 7 | 641.02 | 0.259 |
| 8 | 615.97 | 0.218 |

**Selected K = 3** because it achieved the highest silhouette score.

### Learner Segments

| Cluster | Students | Learner Segment |
|---:|---:|---|
| 0 | 101 | 🤖 AI & Data Explorer |
| 1 | 55 | 💻 Digital Builder |
| 2 | 44 | 🌐 IoT & Cyber Explorer |

### Evaluation Visualizations

#### Elbow Curve

<p align="center">
  <img src="https://raw.githubusercontent.com/anjancodes53/edumatch-ai/main/ml/visualizations/elbow_curve.png" alt="K-Means Elbow Curve" width="80%">
</p>

#### Silhouette Score

<p align="center">
  <img src="https://raw.githubusercontent.com/anjancodes53/edumatch-ai/main/ml/visualizations/silhouette_score.png" alt="K-Means Silhouette Scores" width="80%">
</p>

---

## 🎯 Recommendation Engine

Each course receives a score based on multiple profile signals:

| Signal | Weight / Logic |
|---|---:|
| Interest match | +40 |
| Exact skill-level match | +25 |
| One-level skill progression | +15 |
| Course-type match | +20 |
| Duration match | +10 |
| Course rating | Added to score |
| Segment alignment | +10 |
| Platform diversity | Maximum 2 per platform in first selection pass |

The system returns the top five recommendations and provides an explanation for each recommendation.

---

## 🏗️ Architecture

```text
┌─────────────────────────────┐
│       React + Vite          │
│       Frontend              │
└──────────────┬──────────────┘
               │ REST API
               ▼
┌─────────────────────────────┐
│          FastAPI            │
│        Backend API          │
└───────┬───────────┬─────────┘
        │           │
        ▼           ▼
┌─────────────┐ ┌────────────────────┐
│   SQLite    │ │ Machine Learning   │
│  Database   │ │ K-Means + Scaler   │
└─────────────┘ └──────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │ Recommendation   │
                  │     Engine       │
                  └──────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend
- React
- Vite
- JavaScript
- Modern responsive UI

### Backend
- Python
- FastAPI
- Pydantic
- SQLAlchemy
- SQLite

### Machine Learning
- Python
- pandas
- scikit-learn
- K-Means clustering

### Deployment
- Vercel
- Render
- GitHub

---

## 📁 Project Structure

```text
edumatch-ai/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── student.py
│   │   │   └── analytics.py
│   │   ├── db/
│   │   │   └── database.py
│   │   ├── models/
│   │   │   └── student.py
│   │   ├── schemas/
│   │   │   └── student.py
│   │   └── main.py
│   ├── requirements.txt
│   └── student_recommendation.db
│
├── frontend/
│   ├── src/
│   │   └── App.jsx
│   └── package.json
│
├── ml/
│   ├── courses/
│   │   └── courses.csv
│   ├── data/
│   │   ├── students.csv
│   │   ├── student_features.csv
│   │   └── student_clusters.csv
│   ├── models/
│   │   ├── kmeans_model.pkl
│   │   ├── scaler.pkl
│   │   └── preprocessor.pkl
│   ├── visualizations/
│   │   ├── elbow_curve.png
│   │   ├── silhouette_score.png
│   │   └── cluster_evaluation.csv
│   ├── generate_dataset.py
│   ├── feature_engineering.py
│   ├── segmentation.py
│   ├── cluster_analysis.py
│   ├── visualize_clusters.py
│   ├── predict.py
│   └── recommend.py
│
├── docs/
│   ├── edumatch-banner.svg
│   └── screenshots/
│       ├── landing-page.png
│       ├── student-profile.png
│       ├── learning-preferences.png
│       └── recommendations.png
│
├── .gitignore
└── README.md
```

---

## 🔌 API Endpoints

### Health Check

```http
GET /health
```

### Student Analysis

```http
POST /api/student/analyze
```

### Analytics Summary

```http
GET /api/analytics/summary
```

### Interactive API Documentation

[Open FastAPI Swagger Docs](https://edumatch-ai-backend-pn11.onrender.com/docs)

---

## 💻 Run Locally

### Backend

```powershell
cd backend
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🌐 Live Demo

**Frontend**

https://edumatch-ai-two.vercel.app

**Backend**

https://edumatch-ai-backend-pn11.onrender.com

**API Docs**

https://edumatch-ai-backend-pn11.onrender.com/docs

---

## 🔮 Future Improvements

- Real-world student interaction dataset
- Collaborative filtering
- Learning-to-rank recommendation models
- Course completion and feedback tracking
- Larger course catalog
- Automated model retraining
- Advanced learner profiling
- Production database
- Recommendation feedback loop

---

## 👨‍💻 Author

**Anjan Pattnaik**

B.Tech, Computer Science and Engineering (IoT Domain)

---

## 📄 Research Paper

The project research paper covers the dataset, methodology, K-Means evaluation, learner segmentation, recommendation engine, implementation, results, limitations, and future work.

---

<p align="center">
  <strong>EduMatch AI</strong><br>
  Analyze. Segment. Learn Smarter.
</p>

