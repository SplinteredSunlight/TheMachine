from typing import List, Optional, Union
from pydantic import AnyHttpUrl, validator
from pydantic_settings import BaseSettings
import json
import os


class Settings(BaseSettings):
    # API settings
    API_V1_PREFIX: str = "/api/v1"
    PROJECT_NAME: str = "TheMachine"
    DEBUG: bool = True

    # Security settings
    SECRET_KEY: str = "CHANGE_ME_IN_PRODUCTION"  # Change in production
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []

    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    # Database settings
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/themachine"
    
    # Vector database settings
    VECTOR_DB_PATH: str = "./data/vectordb"
    
    # AI Model settings
    OPENAI_API_KEY: Optional[str] = None
    ANTHROPIC_API_KEY: Optional[str] = None
    DEFAULT_MODEL: str = "gpt-4o-mini"
    
    # Redis settings
    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379
    
    # Cost management settings
    COST_LIMIT_DAILY: float = 10.0  # USD
    
    # File storage settings
    UPLOAD_DIR: str = "./data/uploads"
    
    class Config:
        case_sensitive = True
        env_file = ".env"


# Create settings instance
settings = Settings()

# Ensure required directories exist
os.makedirs(settings.VECTOR_DB_PATH, exist_ok=True)
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
