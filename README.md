<p align="center">
  <img src="docs/edumatch-banner.svg" alt="EduMatch AI Banner" width="100%">
</p>

<div align="center">

# ⚡ EduMatch AI

### Student Segmentation & Personalized Learning Recommendation System

**Analyze. Segment. Learn Smarter.**

An ML-powered full-stack application that analyzes student profiles, identifies learner segments using K-Means clustering, and generates personalized course recommendations.

<br>

![Frontend](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Backend](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.13-3776AB?style=for-the-badge&logo=python&logoColor=white)
![ML](https://img.shields.io/badge/ML-Scikit--Learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)
![Database](https://img.shields.io/badge/Database-SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

<br>

[🚀 Launch Application](http://localhost:5173) •
[🧠 ML Pipeline](#-machine-learning-pipeline) •
[🏗️ Architecture](#️-system-architecture)

</div>

---

# ✨ What is EduMatch AI?

EduMatch AI is a full-stack machine learning application designed to help students discover learning opportunities that match their individual profiles.

The system takes a student's:

- Age
- Skill level
- Interests
- Preferred course type
- Preferred duration

and processes this information through a machine learning pipeline to:

1. Engineer meaningful student features
2. Segment students using K-Means clustering
3. Identify the student's learning segment
4. Score available courses
5. Generate personalized course recommendations

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