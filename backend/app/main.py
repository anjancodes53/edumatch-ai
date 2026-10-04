from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.student import router as student_router
from app.api.analytics import router as analytics_router

from app.db.database import Base, engine
from app.models.student import Student


Base.metadata.create_all(
    bind=engine
)


app = FastAPI(
    title="Student Course Recommendation API",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://edumatch-ai-two.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    student_router
)

app.include_router(
    analytics_router
)


@app.get("/")
def root():
    return {
        "message":
        "Student Course Recommendation API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.get("/api/test")
def test():
    return {
        "message":
        "Frontend and Backend are connected!"
    }