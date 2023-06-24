import datetime
from sqlalchemy.orm import Session, joinedload
from fastapi import HTTPException
from app.models.order_model import Order
from app.models.product_model import Product
from app.schemas import order_schema
from app.crud.crud_product import get_products_by_order_id, get_product


def get_order(db: Session, order_id: int):
    return (
        db.query(Order)
        .options(joinedload(Order.products))
        .filter(Order.id == order_id)
        .first()
    )


def get_orders_by_ordered_day(db: Session, ordered_day: datetime):
    return (
        db.query(Order)
        .options(joinedload(Order.products))
        .filter(Order.ordered_day == ordered_day)
        .all()
    )


def get_orders_by_user_id(db: Session, user_id: int):
    return (
        db.query(Order)
        .options(joinedload(Order.products))
        .filter(Order.user_id == user_id)
        .all()
    )


# skip and limit for paging
def get_orders(db: Session, skip: int = 0, limit: int = 100):
    return (
        db.query(Order)
        .options(joinedload(Order.products))
        .offset(skip)
        .limit(limit)
        .all()
    )


def create_order(db: Session, order: order_schema.OrderCreate):
    db_order = get_orders_by_ordered_day(db, ordered_day=order.ordered_day)
    if db_order:
        raise HTTPException(status_code=400, detail="Name already existed!")

    products = []
    for product_id in order.product_ids:
        product = get_product(db, product_id)
        products.append(product)

    db_order = Order(
        user_id=order.user_id,
        type=order.type,
        ordered_day=order.ordered_day,
        finished_day=order.finished_day,
        total_price=order.total_price,
    )

    db_order.products.extend(products)

    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order


def update_order(db: Session, order: order_schema.OrderUpdate, order_id: int):
    db_order = db.get(Order, order_id)
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")

    order_data = order.dict(exclude_unset=True)
    for key, value in order_data.items():
        setattr(db_order, key, value)

    product_ids = order_data.pop("product_ids")
    print("db order: ", product_ids)
    products = []
    for product_id in product_ids:
        product = get_product(db, product_id)
        products.append(product)

    # db_order.ordered_day = timezone.localize(db_order.ordered_day)
    # order_data.products.append(products)
    # # db_order.products = get_products_by_order_id(db, order_id)

    print("db_order: ", db_order.products)

    # db_order = get_order(db, order_id=order_id)
    # db_order = Order(
    #     order_id=order.order_id,
    #     type=order.type,
    #     ordered_day=order.ordered_day,
    #     finished_day=order.finished_day,
    #     total_price=order.total_price,
    # )
    # print(db_order.finished_day)
    db_order.products.clear()
    db_order.products.extend(products)

    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order


def delete_order(order_id: int, db: Session):
    order = db.query(Order).filter(Order.id == order_id).first()
    if order is None:
        raise HTTPException(status_code=404, detail="Order not found")

    db.delete(order)
    db.commit()
    return {"message": "Successfully delete order"}
