from sqlalchemy.orm import Session, joinedload
from fastapi import HTTPException
from app.core.config import settings
from datetime import datetime


def create_payment(total_price: int, db: Session):
    tmn_code = settings.VNPAY_TMN_CODE
    secret_key = settings.VNPAY_HASH_SECRET_KEY
    vnpay_url = settings.VNPAY_API_URL
    return_url = settings.VNPAY_RETURN_URL

    date = datetime.now()
