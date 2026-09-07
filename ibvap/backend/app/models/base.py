from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime
from datetime import datetime

Base = declarative_base()

class Camera(Base):
    __tablename__ = "cameras"
    id = Column(String, primary_key=True, index=True)
    location = Column(String)
    status = Column(String, default="ONLINE")
    fps = Column(Integer, default=30)
    network_status = Column(String, default="ONLINE")

class Track(Base):
    __tablename__ = "tracks"
    id = Column(String, primary_key=True, index=True)
    person_id = Column(String, index=True)
    camera_id = Column(String, index=True)
    start_time = Column(DateTime, default=datetime.utcnow)
    end_time = Column(DateTime, nullable=True)

class Incident(Base):
    __tablename__ = "incidents"
    id = Column(String, primary_key=True, index=True)
    person_id = Column(String, index=True)
    risk_score = Column(Float, default=0.0)
    current_zone = Column(String)
    predicted_zone = Column(String)
    status = Column(String, default="NEW")
