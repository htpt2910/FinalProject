from typing import Optional
from pydantic import BaseModel


class ProductBase(BaseModel):
    product_name: Optional[str] = None
    breed: Optional[str] = None
    desc: Optional[str] = None
    quantity: Optional[str] = None
    price: Optional[str] = None
    image_uri: Optional[str] = None


class ProductCreate(ProductBase):
    pass


class ProductUpdate(ProductBase):
    pass


class Product(ProductBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True
