from minio import Minio
from minio.error import S3Error
from app.core.config import settings


def get_minio():
    client = Minio(
        settings.MINIO_HOST,
        access_key=settings.MINIO_ACCESS_KEY,
        secret_key=settings.MINIO_SECRET_KEY,
    )

    return client
