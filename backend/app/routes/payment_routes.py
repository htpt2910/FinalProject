from datetime import datetime
from typing import Any, List, Union
from app.schemas import payment_schema

from fastapi import Depends, FastAPI, HTTPException, APIRouter
from sqlalchemy.orm import Session
from app.models import breed_model
from app.crud import crud_payment
from app.schemas import breed_schema
from app.db.database import SessionLocal, engine
from app.ai.breed_classify import class_names
from app.core.config import settings
from app.core.vnpay import vnpay
from random import randint
from fastapi.responses import JSONResponse, RedirectResponse

import hashlib

payment_router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


vnp = vnpay()


@payment_router.post("/create_payment")
def create_payment(total_price: int, user_id: int):
    vnp_TxnRef = randint(10000, 99999)
    order_type = "others"
    order_id = vnp_TxnRef
    amount = total_price
    order_desc = (
        f"Thanh toán cho đơn hàng của người dùng có mã số {user_id}. Số tiền {amount}."
    )
    bank_code = settings.VNPAY_BANKCODE
    language = settings.VNPAY_LOCALE
    ipaddr = settings.IP_ADDRESS

    vnp.requestData["vnp_Version"] = "2.1.0"
    vnp.requestData["vnp_Command"] = "pay"
    vnp.requestData["vnp_TmnCode"] = settings.VNPAY_TMN_CODE
    vnp.requestData["vnp_Amount"] = amount * 10000
    vnp.requestData["vnp_CurrCode"] = "VND"
    vnp.requestData["vnp_TxnRef"] = order_id
    vnp.requestData["vnp_OrderInfo"] = order_desc
    vnp.requestData["vnp_OrderType"] = order_type
    vnp.requestData["vnp_Locale"] = language
    vnp.requestData["vnp_BankCode"] = bank_code
    vnp.requestData["vnp_CreateDate"] = datetime.now().strftime("%Y%m%d%H%M%S")
    vnp.requestData["vnp_IpAddr"] = ipaddr
    vnp.requestData["vnp_ReturnUrl"] = settings.VNPAY_RETURN_URL
    vnpay_payment_url = vnp.get_payment_url(
        settings.VNPAY_PAYMENT_URL, settings.VNPAY_HASH_SECRET_KEY
    )
    print("vnpay_payment_url: ", vnpay_payment_url)

    return vnpay_payment_url


@payment_router.get("/", response_model=List[payment_schema.Payment])
def read_payments(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud_payment.get_payments(db, skip=skip, limit=limit)


@payment_router.get("/{payment_id}")
def get_payment(payment_id: int, db: Session = Depends(get_db)):
    return crud_payment.get_payment_by_payment_id(db=db, payment_id=payment_id)


@payment_router.get("/by_order/{order_id}")
def get_payment(order_id: int, db: Session = Depends(get_db)):
    return crud_payment.get_payment_by_order_id(db=db, order_id=order_id)


@payment_router.post("/save_payment")
def save_payment_to_db(
    payment: payment_schema.PaymentCreate, db: Session = Depends(get_db)
):
    return crud_payment.create_payment(db=db, payment=payment)


@payment_router.patch("/{payment_id}", response_model=payment_schema.Payment)
def update_payment(
    payment_id: int,
    payment: payment_schema.PaymentUpdate,
    db: Session = Depends(get_db),
):
    return crud_payment.update_payment(db=db, payment=payment, payment_id=payment_id)


@payment_router.delete("/{payment_id}")
def delete_payment(payment_id: int, db: Session = Depends(get_db)):
    return crud_payment.delete_payment(payment_id=payment_id, db=db)
