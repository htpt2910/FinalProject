from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime


class PaymentBase(BaseModel):
    order_id: Optional[int]
    code: Optional[str]
    money: Optional[str]
    payment_content: Optional[str]
    status: Optional[str]
    bank_code: Optional[str]
    payment_date: Optional[datetime]


class PaymentCreate(PaymentBase):
    pass


class PaymentUpdate(PaymentBase):
    pass


class Payment(PaymentBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True
