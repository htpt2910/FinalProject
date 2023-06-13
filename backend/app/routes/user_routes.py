from typing import Any, List, Union

from fastapi import Depends, FastAPI, HTTPException, APIRouter
from sqlalchemy.orm import Session
from app.models import user_model
from app.crud import crud_user
from app.schemas import user_schema
from app.db.database import SessionLocal, engine

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
