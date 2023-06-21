from datetime import timedelta
from typing import Annotated, Any, List, Union
from uuid import uuid4 as uuid

from app.crud import crud_user
from app.db.database import SessionLocal, engine
from app.db.minio import get_minio
from app.models import user_model
from app.schemas import user_schema
from fastapi import APIRouter, Depends, FastAPI, File, Form, HTTPException, UploadFile
from sqlalchemy.orm import Session
from app.core.config import settings

user_router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@user_router.get("/", response_model=List[user_schema.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud_user.get_users(db, skip=skip, limit=limit)
    return users


@user_router.get("/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    return crud_user.get_user(db=db, user_id=user_id)


@user_router.get("/{user_email}/info")
def get_user(user_email: str, db: Session = Depends(get_db)):
    return crud_user.get_user_by_email(db=db, email=user_email)


@user_router.post("/save_user")
def save_uid(
    name: str = Form(),
    email: str = Form(),
    image_uri: str = Form(),
    db: Session = Depends(get_db),
):
    print("image_uri: ", image_uri)
    return crud_user.save_uid(name=name, email=email, image_uri=image_uri, db=db)
    # return {"name": name}


@user_router.post("/", response_model=user_schema.User)
def create_user(user: user_schema.UserCreate, db: Session = Depends(get_db)):
    return crud_user.create_user(db=db, user=user)


@user_router.patch("/{user_id}", response_model=user_schema.User)
def update_user(
    user_id: int, user: user_schema.UserUpdate, db: Session = Depends(get_db)
):
    return crud_user.update_user(db=db, user=user, user_id=user_id)


@user_router.delete("/{user_id}", response_model=user_schema.User)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    return crud_user.delete_user(user_id=user_id, db=db)


@user_router.patch("/{user_id}/avatar")
def update_user_avatar(
    user_id: int,
    file: UploadFile,
    db: Session = Depends(get_db),
):
    if not file:
        return
    else:
        minio_client = get_minio()
        image_id = uuid().hex
        minio_client.fput_object(settings.MINIO_BUCKET, image_id, file.file.fileno())
        crud_user.update_user_avatar(
            db,
            image_id,
            user_id,
        )
        return {"filename": image_id}


@user_router.get("/{user_id}/avatar")
def get_user_avatar(
    user_id: int,
    db: Session = Depends(get_db),
):
    minio_client = get_minio()
    image_uri = crud_user.get_user_avatar(db=db, user_id=user_id)
    return {
        "url": minio_client.get_presigned_url(
            "GET", settings.MINIO_BUCKET, image_uri, timedelta(days=1)
        )
    }
