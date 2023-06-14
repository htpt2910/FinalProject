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

    MINIO_HOST = os.getenv("AH_S3_OBJECT_STORAGE_STACKHERO_OLIVE_HOST", "")
    MINIO_ACCESS_KEY = os.getenv(
        "AH_S3_OBJECT_STORAGE_STACKHERO_OLIVE_ROOT_ACCESS_KEY", ""
    )
    MINIO_SECRET_KEY = os.getenv("AH_S3_OBJECT_STORAGE_STACKHERO_OLIVE_ROOT_SECRET_KEY")


settings = Settings()
