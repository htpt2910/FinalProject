import os
import re
from dotenv import load_dotenv

from pathlib import Path

env_path = Path(".") / ".env"
load_dotenv(dotenv_path=env_path)


class Settings:
    PROJECT_NAME: str = "Final Project"
    PROJECT_VERSION: str = "1.0.0"

    DATABASE_URL = re.sub(
        r"^postgres://", "postgresql://", os.getenv("DATABASE_URL", "")
    )

    MINIO_HOST = os.getenv("S3_HOST", "")
    MINIO_ACCESS_KEY = os.getenv("S3_ACCESS_KEY", "")
    MINIO_SECRET_KEY = os.getenv("S3_SECRET_KEY")
    MINIO_BUCKET = os.getenv("S3_BUCKET")


settings = Settings()
