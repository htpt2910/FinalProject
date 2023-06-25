from typing import Any, List, Union

from uuid import uuid4 as uuid
from datetime import timedelta
from fastapi import Depends, FastAPI, HTTPException, APIRouter, File, UploadFile
from sqlalchemy.orm import Session
from app.models import service_model
from app.crud import crud_service
from app.schemas import service_schema
from app.db.database import SessionLocal, engine
from app.db.minio import get_minio
from app.core.config import settings


service_router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@service_router.get("/", response_model=List[service_schema.Service])
def read_services(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    services = crud_service.get_services(db, skip=skip, limit=limit)
    return services


# // get all services that has in cart includes userid
@service_router.get("/cart")
def get_services_has_in_cart_includes_user_id(
    user_id: str, db: Session = Depends(get_db)
):
    return crud_service.get_services_has_in_cart_includes_user_id(
        db=db, user_id=user_id
    )


@service_router.post("/", response_model=service_schema.Service)
def create_service(
    service: service_schema.ServiceCreate, db: Session = Depends(get_db)
):
    return crud_service.create_service(db=db, service=service)


@service_router.get("/by_breed/{breed_id}")
def get_services(breed_id: int, db: Session = Depends(get_db)):
    return crud_service.get_service_by_breed_id(db=db, breed_id=breed_id)


@service_router.get("/{service_id}", response_model=service_schema.Service)
def get_service(service_id: int, db: Session = Depends(get_db)):
    return crud_service.get_service(db, service_id=service_id)


@service_router.patch("/{service_id}", response_model=service_schema.Service)
def update_service(
    service_id: int,
    service: service_schema.ServiceUpdate,
    db: Session = Depends(get_db),
):
    return crud_service.update_service(db=db, service=service, service_id=service_id)


@service_router.delete("/{service_id}")
def delete_service(service_id: int, db: Session = Depends(get_db)):
    return crud_service.delete_service(service_id=service_id, db=db)


@service_router.patch("/{service_id}/image")
def update_service_image(
    service_id: int,
    file: UploadFile,
    db: Session = Depends(get_db),
):
    if not file:
        return
    else:
        minio_client = get_minio()
        image_id = uuid().hex
        minio_client.fput_object(settings.MINIO_BUCKET, image_id, file.file.fileno())
        crud_service.update_service_image(db, image_id, service_id)
        return {"filename": image_id}


@service_router.get("/{service_id}/image")
def get_service_image(
    service_id: int,
    db: Session = Depends(get_db),
):
    minio_client = get_minio()
    image_uri = crud_service.get_service_image(db=db, service_id=service_id)
    return {
        "url": minio_client.get_presigned_url(
            "GET", settings.MINIO_BUCKET, image_uri, timedelta(days=1)
        )
    }
