from typing import Optional
from pydantic import BaseModel
from datetime import datetime


class OrderBase(BaseModel):
    user_id: int
    type: str
    ordered_day: datetime
    finished_day: Optional[datetime] = None


class OrderCreate(OrderBase):
    pass


class OrderUpdate(OrderBase):
    pass


class Order(OrderBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True
