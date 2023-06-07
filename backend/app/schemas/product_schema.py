from typing import Optional
from pydantic import BaseModel

class ProductBase(BaseModel):
    product_name: str
    breed: str
    desc: str
    quantity: str
    price: str

class ProductCreate(ProductBase):
    pass

class ProductUpdate(ProductBase):
    product_name: Optional[str] = None
    breed: Optional[str] = None
    desc: Optional[str] = None
    quantity: Optional[str] = None
    price: Optional[str] = None

class Product(ProductBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True