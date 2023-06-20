from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.order_model import Order
from app.schemas import order_schema


def get_orders(db: Session, order_id: int):
    return db.query(Order).filter(Order.id == order_id).first()


def get_orders_by_user_id(db: Session, user_id: int):
    return db.query(Order).filter(Order.user_id == user_id).all()


def get_order_by_name(db: Session, order_name: str):
    return db.query(Order).filter(Order.name == order_name).first()


def get_all_by_order_name(db: Session, order_name: str):
    return db.query(Order).filter(Order.name == order_name).all()


# skip and limit for paging
def get_orders(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Order).offset(skip).limit(limit).all()


def create_order(db: Session, order: order_schema.OrderCreate):
    db_order = get_orders_by_user_id(db, user_id=order.user_id)
    if db_order:
        raise HTTPException(status_code=400, detail="Name already existed!")

    db_order = Order(
        user_id=order.user_id,
        type=order.type,
        ordered_day=order.ordered_day,
        finished_day=order.finished_day,
    )
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

    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order


def delete_order(order_id: int, db: Session):
    order = db.query(Order).filter(Order.id == order_id)
    order.delete()
    db.commit()
    return {"message": "Successfully delete order {order.name}"}
