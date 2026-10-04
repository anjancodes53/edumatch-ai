from sqlalchemy import Column, Integer, String, Text

from app.db.database import Base


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)

    age = Column(Integer, nullable=False)

    skill_level = Column(String(50), nullable=False)

    interests = Column(Text, nullable=False)

    course_type = Column(String(100), nullable=False)

    duration = Column(String(100), nullable=False)