from typing import Optional, List
from app.schemas.product_schema import Product
from pydantic import BaseModel


class BreedBase(BaseModel):
    name: str
    desc: str


class BreedCreate(BreedBase):
    pass


class BreedUpdate(BreedBase):
    name: Optional[str] = None
    desc: Optional[str] = None


class Breed(BreedBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True
