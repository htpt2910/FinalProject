from typing import Any, List, Union

from uuid import uuid4 as uuid
from datetime import timedelta
from fastapi import Depends, FastAPI, HTTPException, APIRouter, File, UploadFile
from sqlalchemy.orm import Session
from app.models import product_model
from app.crud import crud_product
from app.schemas import product_schema
from app.db.database import SessionLocal, engine
from app.db.minio import get_minio
from app.core.config import settings


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


# // get all products that has in cart includes userid
@product_router.get("/cart")
def get_products_has_in_cart_includes_user_id(
    user_id: str, db: Session = Depends(get_db)
):
    return crud_product.get_products_has_in_cart_includes_user_id(
        db=db, user_id=user_id
    )


@product_router.post("/", response_model=product_schema.Product)
def create_product(
    product: product_schema.ProductCreate, db: Session = Depends(get_db)
):
    return crud_product.create_product(db=db, product=product)


@product_router.get("/by_breed/{breed_id}")
def get_products(breed_id: int, db: Session = Depends(get_db)):
    return crud_product.get_product_by_breed_id(db=db, breed_id=breed_id)


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


@product_router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    return crud_product.delete_product(product_id=product_id, db=db)


@product_router.patch("/{product_id}/image")
def update_product_image(
    product_id: int,
    file: UploadFile,
    db: Session = Depends(get_db),
):
    if not file:
        return
    else:
        minio_client = get_minio()
        image_id = uuid().hex
        minio_client.fput_object(settings.MINIO_BUCKET, image_id, file.file.fileno())
        crud_product.update_product_image(db, image_id, product_id)
        return {"filename": image_id}


@product_router.get("/{product_id}/image")
def get_product_image(
    product_id: int,
    db: Session = Depends(get_db),
):
    minio_client = get_minio()
    image_uri = crud_product.get_product_image(db=db, product_id=product_id)
    return {
        "url": minio_client.get_presigned_url(
            "GET", settings.MINIO_BUCKET, image_uri, timedelta(days=1)
        )
    }
