from typing import Any, List, Union

from fastapi import Depends, FastAPI, HTTPException, APIRouter
from sqlalchemy.orm import Session
from app.models import product_model
from app.crud import crud_product
from app.schemas import product_schema
from app.db.database import SessionLocal, engine

product_model.Base.metadata.create_all(bind=engine)

product_router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@product_router.get("/", response_model=List[product_schema.Product])
def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    products = crud_product.get_products(db, skip=skip, limit=limit)
    return products


@product_router.post("/", response_model=product_schema.Product)
def create_product(
    product: product_schema.ProductCreate, db: Session = Depends(get_db)
):
    return crud_product.create_product(db=db, product=product)


@product_router.get("/{product_id}", response_model=product_schema.Product)
def get_product(product_id: int, db: Session = Depends(get_db)):
    return crud_product.get_product(db, product_id=product_id)


@product_router.patch("/{product_id}", response_model=product_schema.Product)
def update_product(
    product_id: int,
    product: product_schema.ProductUpdate,
    db: Session = Depends(get_db),
):
    return crud_product.update_product(db=db, product=product, product_id=product_id)


@product_router.delete("/{product_id}", response_model=product_schema.Product)
def delete_product(product_id: int, db: Session = Depends(get_db)):
    return crud_product.delete_product(product_id=product_id, db=db)
