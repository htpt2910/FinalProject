from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.product_model import Product
from app.schemas import product_schema


def get_product(db: Session, product_id: int):
    return db.query(Product).filter(Product.id == product_id).first()


def get_product_by_product_name(db: Session, product_name: str):
    return db.query(Product).filter(Product.product_name == product_name).first()


# skip and limit for paging
def get_products(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Product).offset(skip).limit(limit).all()


def create_product(db: Session, product: product_schema.ProductCreate):
    db_product = get_product_by_product_name(db, product_name=product.product_name)
    if db_product:
        raise HTTPException(status_code=400, detail="Product already registered")

    db_product = Product(
        product_name=product.product_name,
        breed=product.breed,
        desc=product.desc,
        quantity=product.quantity,
        price=product.price,
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


def update_product(db: Session, product: product_schema.ProductUpdate, product_id: int):
    db_product = db.get(Product, product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    product_data = product.dict(exclude_unset=True)
    for key, value in product_data.items():
        setattr(db_product, key, value)

    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


def delete_product(product_id: int, db: Session):
    product = db.query(Product).filter(Product.id == product_id)
    product.delete()
    db.commit()
    return {"message": "Successfully delete product {product.product_name}"}
