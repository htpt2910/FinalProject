from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.breed_model import Breed
from app.schemas import breed_schema


def get_breeds(db: Session, breed_id: int):
    return db.query(Breed).filter(Breed.id == breed_id).first()


def get_breed_by_name(db: Session, name: str):
    return db.query(Breed).filter(Breed.name == name).first()


# skip and limit for paging
def get_breeds(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Breed).offset(skip).limit(limit).all()


def create_breed(db: Session, breed: breed_schema.BreedCreate):
    db_breed = get_breed_by_name(db, name=breed.name)
    if db_breed:
        raise HTTPException(status_code=400, detail="Name already existed!")

    db_breed = Breed(name=breed.name, desc=breed.desc)
    db.add(db_breed)
    db.commit()
    db.refresh(db_breed)
    return db_breed


def update_breed(db: Session, breed: breed_schema.BreedUpdate, breed_id: int):
    db_breed = db.get(Breed, breed_id)
    if not db_breed:
        raise HTTPException(status_code=404, detail="Breed not found")
    breed_data = breed.dict(exclude_unset=True)
    for key, value in breed_data.items():
        setattr(db_breed, key, value)

    db.add(db_breed)
    db.commit()
    db.refresh(db_breed)
    return db_breed


def delete_breed(breed_id: int, db: Session):
    breed = db.query(Breed).filter(Breed.id == breed_id)
    breed.delete()
    db.commit()
    return {"message": "Successfully delete breed {breed.name}"}
