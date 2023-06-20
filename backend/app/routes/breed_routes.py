from typing import Any, List, Union

from fastapi import Depends, FastAPI, HTTPException, APIRouter
from sqlalchemy.orm import Session
from app.models import breed_model
from app.crud import crud_breed
from app.schemas import breed_schema
from app.db.database import SessionLocal, engine
from app.ai.breed_classify import class_names

breed_router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@breed_router.get("/", response_model=List[breed_schema.Breed])
def read_breeds(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    breeds = crud_breed.get_breeds(db, skip=skip, limit=limit)
    return breeds


@breed_router.get("/{breed_name}")
def get_breed(breed_name: str, db: Session = Depends(get_db)):
    return crud_breed.get_breed_by_name(db, breed_name=breed_name)


@breed_router.get("/{breed_name}/all")
def get_breed(breed_name: str, db: Session = Depends(get_db)):
    return crud_breed.get_all_by_breed_name(db, breed_name=breed_name)


@breed_router.post("/", response_model=breed_schema.Breed)
def create_breed(breed: breed_schema.BreedCreate, db: Session = Depends(get_db)):
    return crud_breed.create_breed(db=db, breed=breed)


@breed_router.patch("/{breed_id}", response_model=breed_schema.Breed)
def update_breed(
    breed_id: int, breed: breed_schema.BreedUpdate, db: Session = Depends(get_db)
):
    return crud_breed.update_breed(db=db, breed=breed, breed_id=breed_id)


@breed_router.delete("/{breed_id}", response_model=breed_schema.Breed)
def delete_breed(breed_id: int, db: Session = Depends(get_db)):
    return crud_breed.delete_breed(breed_id=breed_id, db=db)
