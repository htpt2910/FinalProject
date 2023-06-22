from sqlalchemy.orm import Session, joinedload
from fastapi import HTTPException
from app.models.cart_model import Cart
from app.schemas import cart_schema
from app.crud.crud_product import get_product


def get_cart(db: Session, cart_id: int):
    return (
        db.query(Cart)
        .options(joinedload(Cart.products))
        .filter(Cart.id == cart_id)
        .first()
    )


def get_carts_by_user_id(db: Session, user_id: int):
    return (
        db.query(Cart)
        .options(joinedload(Cart.products))
        .filter(Cart.user_id == user_id)
        .first()
    )


# skip and limit for paging
def get_carts(db: Session, skip: int = 0, limit: int = 100):
    return (
        db.query(Cart)
        .options(joinedload(Cart.products))
        .offset(skip)
        .limit(limit)
        .all()
    )


def create_cart(db: Session, cart: cart_schema.CartCreate):
    print("hoho: ", cart.product_ids)

    products = []
    for product_id in cart.product_ids:
        product = get_product(db, product_id)
        products.append(product)

    db_cart = Cart(user_id=cart.user_id)
    db_cart.products.extend(products)

    db.add(db_cart)
    db.commit()
    db.refresh(db_cart)
    return db_cart


def update_cart(db: Session, cart: cart_schema.CartUpdate, cart_id: int):
    db_cart = db.get(Cart, cart_id)
    if not db_cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    cart_data = cart.dict(exclude_unset=True)
    for key, value in cart_data.items():
        setattr(db_cart, key, value)

    product_ids = cart_data.pop("product_ids")
    print("db cart: ", product_ids)
    products = []
    for product_id in product_ids:
        product = get_product(db, product_id)
        products.append(product)

    db_cart.products.clear()
    db_cart.products.extend(products)
    db.add(db_cart)
    db.commit()
    db.refresh(db_cart)
    return db_cart


def update_cart_avatar(db: Session, image_uri: str, cart_id: int):
    db_cart = db.get(Cart, cart_id)
    if not db_cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    db_cart.image_uri = image_uri
    db.add(db_cart)
    db.commit()
    db.refresh(db_cart)
    return db_cart


def get_cart_avatar(db: Session, cart_id: int):
    db_cart = db.get(Cart, cart_id)
    if not db_cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    if db_cart.image_uri is None:
        raise HTTPException(status_code=404, detail="Cart avatar not found")

    return db_cart.image_uri


def delete_cart(cart_id: int, db: Session):
    cart = db.query(Cart).filter(Cart.id == cart_id).first()
    cart.delete()
    db.commit()
    return {"message": "Successfully delete cart {cart.name}"}
