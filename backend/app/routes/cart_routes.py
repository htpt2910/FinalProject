from typing import Any, List, Union

from fastapi import Depends, FastAPI, HTTPException, APIRouter
from sqlalchemy.orm import Session
from app.models import cart_model
from app.crud import crud_cart
from app.schemas import cart_schema
from app.db.database import SessionLocal, engine

cart_router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@cart_router.get("/")
def read_carts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    carts = crud_cart.get_carts(db, skip=skip, limit=limit)
    return carts


@cart_router.get("/{cart_id}")
def get_cart(cart_id: int, db: Session = Depends(get_db)):
    return crud_cart.get_cart(db, cart_id=cart_id)


@cart_router.get("/cart/{user_id}")
def get_cart_by_user_id(user_id: str, db: Session = Depends(get_db)):
    return crud_cart.get_carts_by_user_id(db, user_id=user_id)


@cart_router.post("/", response_model=cart_schema.Cart)
def create_cart(cart: cart_schema.CartCreate, db: Session = Depends(get_db)):
    return crud_cart.create_cart(db=db, cart=cart)


@cart_router.patch("/{cart_id}", response_model=cart_schema.Cart)
def update_cart(
    cart_id: int,
    cart: cart_schema.CartUpdate,
    db: Session = Depends(get_db),
):
    return crud_cart.update_cart(
        db=db,
        cart=cart,
        cart_id=cart_id,
    )


@cart_router.delete("/{cart_id}")
def delete_cart(cart_id: int, db: Session = Depends(get_db)):
    return crud_cart.delete_cart(cart_id=cart_id, db=db)
