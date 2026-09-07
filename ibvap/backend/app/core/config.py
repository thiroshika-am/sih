from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "IBVAP - AI-Powered Border Surveillance"
    API_V1_STR: str = "/api/v1"
    CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000"]
    SIMULATION_MODE: bool = True
    
    class Config:
        case_sensitive = True

settings = Settings()
