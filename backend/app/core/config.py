from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # App
    APP_NAME: str = "Portfolio API"
    DEBUG: bool = False
    
    # Database
    DATABASE_URL: str
    
    # Anthropic
    GEMINI_API_KEY: str
    
    # CORS
    FRONTEND_URL: str = "http://localhost:5173"
    
    class Config:
        env_file = ".env"

settings = Settings()