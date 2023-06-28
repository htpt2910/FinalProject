from sqlalchemy.orm import Session, joinedload
from app.models.payment_model import Payment
from app.models.order_model import Order
from app.schemas import payment_schema
from fastapi import HTTPException
from app.core.config import settings
from datetime import datetime


# get all payments


# get 1 payment by order_id
# create_payment
# update_payment (maybe not use)
# delete_payment (when delete order)


def get_payment_by_order_id(db: Session, order_id: int):
    return (
        db.query(Payment)
        .options(joinedload(Order.payments))
        .filter(Payment.order_id == order_id)
        .first()
    )


def get_payment_by_payment_id(db: Session, payment_id: int):
    return db.query(Payment).filter(payment_id == Payment.id).first()


# skip and limit for paging
def get_payments(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Payment).offset(skip).limit(limit).all()


def create_payment(db: Session, payment: payment_schema.PaymentCreate):
    db_payment = get_payment_by_payment_id(db, payment_name=payment.id)
    if db_payment:
        raise HTTPException(status_code=400, detail="Payment already completed")

    db_payment = Payment(
        code=payment.code,
        money=payment.money,
        status=payment.status,
        bank_code=payment.bank_code,
        payment_date=payment.payment_date,
        order_id=payment.order_id,
    )

    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)
    return db_payment


# may be not use


def update_payment(db: Session, payment: payment_schema.PaymentUpdate, payment_id: int):
    db_payment = db.get(Payment, payment_id)
    if not db_payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    payment_data = payment.dict(exclude_unset=True)
    for key, value in payment_data.items():
        print(key, value)
        setattr(db_payment, key, value)

    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)
    return db_payment


# delete payment when user cancel order


def delete_payment(payment_id: int, db: Session):
    payment = db.query(Payment).filter(Payment.id == payment_id)
    payment.delete()
    db.commit()
    return {"message": "Successfully delete payment {payment.payment_name}"}
