from typing import Optional
from pydantic import BaseModel


class UserBase(BaseModel):
    email: str
    name: str
    phone: str
    image_uri: str


class UserCreate(UserBase):
    password: str


class UserUpdate(UserBase):
    username: Optional[str] = None
    email: Optional[str] = None
    name: Optional[str] = None
    phone: Optional[str] = None
    image_uri: Optional[str] = None


class User(UserBase):
    id: str
    is_active: bool

    class Config:
        orm_mode = True
