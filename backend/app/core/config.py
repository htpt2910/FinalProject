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

    # vppay payment

    VNPAY_RETURN_URL = os.getenv("VNPAY_RETURN_URL", "")
    VNPAY_PAYMENT_URL = os.getenv("VNPAY_PAYMENT_URL", "")
    VNPAY_API_URL = os.getenv("VNPAY_API_URL", "")
    VNPAY_TMN_CODE = os.getenv("VNPAY_TMN_CODE", "")
    VNPAY_HASH_SECRET_KEY = os.getenv("VNPAY_HASH_SECRET_KEY", "")
    VNPAY_VERSION = os.getenv("VNPAY_VERSION", "2.1.0")
    VNAPAY_COMMAND = os.getenv("VNAPAY_COMMAND", "")
    VNPAY_CURRCODE = os.getenv("VNPAY_CURRCODE", "VND")
    IP_ADDRESS = os.getenv("IP_ADDRESS", "127.0.0.1")
    VNPAY_LOCALE = os.getenv("VNPAY_LOCALE", "vn")
    VNPAY_BANKCODE = os.getenv("VNPAY_BANKCODE", "NCB")


settings = Settings()
