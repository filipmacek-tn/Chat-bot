from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "school-chatbot"
    app_env: str = "development"

    secret_key: str = "change-me-please"
    admin_email: str = "admin@school.local"
    admin_password: str = "admin123"

    database_url: str = "postgresql+psycopg://schoolchat:schoolchat@postgres:5432/schoolchat"
    qdrant_url: str = "http://qdrant:6333"
    ollama_base_url: str = "http://ollama:11434"
    ollama_model: str = "ministral-3:8b"

    upload_dir: str = "/app/data/uploads"

    cors_origins: list[str] = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:8000",
    ]

    @field_validator("cors_origins", mode="before")
    @classmethod
    def parse_cors_origins(cls, value):
        if isinstance(value, str):
            if value.startswith("["):
                import json
                return json.loads(value)
            return [item.strip() for item in value.split(",") if item.strip()]
        return value

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()