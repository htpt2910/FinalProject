from typing import Any, List, Union

from fastapi import Depends, FastAPI, HTTPException, APIRouter
from sqlalchemy.orm import Session
from app.models import order_model
from app.crud import crud_order
from app.schemas import order_schema
from app.db.database import SessionLocal, engine

order_router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@order_router.get("/")
def read_orders(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    orders = crud_order.get_orders(db, skip=skip, limit=limit)
    return orders


@order_router.get("/{order_id}")
def get_order(order_id: int, db: Session = Depends(get_db)):
    return crud_order.get_order(db, order_id=order_id)


@order_router.get("/{user_id}/all")
def get_order_by_user_id(user_id: str, db: Session = Depends(get_db)):
    return crud_order.get_orders_by_user_id(db, user_id=user_id)


@order_router.post("/", response_model=order_schema.Order)
def create_order(order: order_schema.OrderCreate, db: Session = Depends(get_db)):
    return crud_order.create_order(db=db, order=order)


@order_router.patch("/{order_id}", response_model=order_schema.Order)
def update_order(
    order_id: int,
    order: order_schema.OrderUpdate,
    db: Session = Depends(get_db),
):
    return crud_order.update_order(
        db=db,
        order=order,
        order_id=order_id,
    )


@order_router.delete("/{order_id}")
def delete_order(order_id: int, db: Session = Depends(get_db)):
    return crud_order.delete_order(order_id=order_id, db=db)
