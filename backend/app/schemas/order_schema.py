from typing import List, Optional
from app.schemas.product_schema import Product
from pydantic import BaseModel
from datetime import datetime


class OrderBase(BaseModel):
    user_id: Optional[int]
    type: Optional[str]
    ordered_day: Optional[datetime]
    finished_day: Optional[datetime] = None
    total_price: Optional[int]


class OrderCreate(OrderBase):
    product_ids: List[int]


class OrderUpdate(OrderBase):
    product_ids: Optional[List[int]]


class Order(OrderBase):
    id: int
    is_active: bool

    products: List[Product]

    class Config:
        orm_mode = True
