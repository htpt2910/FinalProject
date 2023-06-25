from typing import List, Optional
from app.schemas.product_schema import Product
from pydantic import BaseModel
from datetime import datetime


class ServiceBase(BaseModel):
    service_name: Optional[str]
    price: Optional[int]


class ServiceCreate(ServiceBase):
    pass


class ServiceUpdate(ServiceBase):
    pass


class Service(ServiceBase):
    id: int

    class Config:
        orm_mode = True
