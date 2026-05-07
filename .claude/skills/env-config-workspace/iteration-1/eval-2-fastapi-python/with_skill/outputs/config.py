from pydantic import field_validator
from pydantic_settings import BaseSettings


class Config(BaseSettings):
    """Application configuration loaded from environment variables.

    Validates all required variables at startup — the app fails fast
    if anything is missing or invalid.
    """

    # Database
    database_url: str
    redis_url: str

    # Auth
    secret_key: str

    # AWS
    aws_access_key_id: str
    aws_secret_access_key: str
    s3_bucket: str

    # App
    debug: bool = False
    allowed_hosts: str = "localhost,127.0.0.1"

    @field_validator("secret_key")
    @classmethod
    def secret_key_min_length(cls, v: str) -> str:
        if len(v) < 32:
            raise ValueError("SECRET_KEY must be at least 32 characters")
        return v

    @field_validator("database_url")
    @classmethod
    def database_url_scheme(cls, v: str) -> str:
        if not v.startswith(("postgresql://", "postgres://", "sqlite://")):
            raise ValueError("DATABASE_URL must be a valid database connection string")
        return v

    @field_validator("redis_url")
    @classmethod
    def redis_url_scheme(cls, v: str) -> str:
        if not v.startswith("redis://"):
            raise ValueError("REDIS_URL must start with redis://")
        return v

    @property
    def allowed_hosts_list(self) -> list[str]:
        """Return ALLOWED_HOSTS as a parsed list."""
        return [h.strip() for h in self.allowed_hosts.split(",") if h.strip()]

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
    }


config = Config()  # type: ignore[call-arg]
