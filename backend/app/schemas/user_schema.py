from typing import Optional, List
from app.schemas.order_schema import Order
from app.schemas.cart_schema import Cart
from pydantic import BaseModel


class UserBase(BaseModel):
    email: Optional[str] = None
    name: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    image_uri: Optional[str] = None


class UserCreate(UserBase):
    pass


class UserUpdate(UserBase):
    pass


class User(UserBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True
