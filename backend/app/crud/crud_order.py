import datetime
from sqlalchemy.orm import Session, joinedload
from app.crud.crud_service import get_service
from app.models.service_model import Service
from fastapi import HTTPException
from app.models.order_model import Order
from app.models.product_model import Product
from app.schemas import order_schema
from app.crud.crud_product import get_products_by_order_id, get_product
from app.models.service_model import orders_services


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


def get_service_order(order_id: int, db: Session):
    db_orders_services = db.query(orders_services)
    services_in_order = []
    for order_service in db_orders_services:
        if order_service.order_id == order_id:
            service_id_in_str = str(order_service.service_id)
            services_in_order.extend(service_id_in_str)

    return services_in_order


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

    db_order = Order(
        user_id=order.user_id,
        type=order.type,
        destination=order.destination,
        ordered_day=order.ordered_day,
        finished_day=order.finished_day,
        total_price=order.total_price,
    )

    if order.service_ids is not None:
        services = []
        for service_id in order.service_ids:
            service = get_service(db, service_id)
            services.append(service)

        db_order.services.extend(services)

    if order.product_ids is not None:
        products = []
        for product_id in order.product_ids:
            product = get_product(db, product_id)
            products.append(product)

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

    if order.product_ids is not None:
        product_ids = order_data.pop("product_ids")
        print("db order: ", product_ids)
        products = []
        for product_id in product_ids:
            product = get_product(db, product_id)
            products.append(product)

        db_order.products.clear()
        db_order.products.extend(products)

    # db_order.ordered_day = timezone.localize(db_order.ordered_day)
    # order_data.products.append(products)
    # # db_order.products = get_products_by_order_id(db, order_id)

    # db_order = get_order(db, order_id=order_id)
    # db_order = Order(
    #     order_id=order.order_id,
    #     type=order.type,
    #     ordered_day=order.ordered_day,
    #     finished_day=order.finished_day,
    #     total_price=order.total_price,
    # )
    # print(db_order.finished_day)

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
