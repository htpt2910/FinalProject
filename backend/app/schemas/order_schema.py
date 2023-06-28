from typing import List, Optional
from app.schemas.product_schema import Product
from app.schemas.service_schema import Service
from pydantic import BaseModel
from datetime import datetime


class OrderBase(BaseModel):
    user_id: Optional[int]
    type: Optional[str]
    ordered_day: Optional[datetime]
    finished_day: Optional[datetime] = None
    total_price: Optional[int]
    destination: Optional[str]
    status: Optional[int]


class OrderCreate(OrderBase):
    product_ids: Optional[List[int]]
    service_ids: Optional[List[int]]


class OrderUpdate(OrderBase):
    product_ids: Optional[List[int]]
    service_ids: Optional[List[int]]


class Order(OrderBase):
    id: int
    is_active: bool

    products: List[Product]
    services: List[Service]

    class Config:
        orm_mode = True
