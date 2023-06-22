from typing import Optional, List
from app.schemas.product_schema import Product
from pydantic import BaseModel


class CartBase(BaseModel):
    pass


class CartCreate(CartBase):
    user_id: int
    product_ids: List[int]


class CartUpdate(CartBase):
    product_ids: List[int]


class Cart(CartBase):
    id: int

    products: Optional[List[Product]]

    class Config:
        orm_mode = True
