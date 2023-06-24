from sqlalchemy.orm import Session
from app.models.order_model import Order
from fastapi import HTTPException
from app.models.user_model import User
from app.schemas import user_schema


def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


# skip and limit for paging
def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()


def create_user(db: Session, user: user_schema.UserCreate):
    db_user = get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    db_user = User(
        email=user.email,
        name=user.name,
        phone=user.phone,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def save_uid(name, email, image_uri, db: Session):
    db_user = get_user_by_email(db, email=email)
    if db_user:
        return

    db_user = User(role=0, email=email, name=name, image_uri=image_uri)

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user(db: Session, user: user_schema.UserUpdate, user_id: int):
    db_user = db.get(User, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    user_data = user.dict(exclude_unset=True)
    for key, value in user_data.items():
        setattr(db_user, key, value)

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user_avatar(db: Session, image_uri: str, user_id: int):
    db_user = db.get(User, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db_user.image_uri = image_uri
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_user_avatar(db: Session, user_id: int):
    db_user = db.get(User, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    if db_user.image_uri is None:
        raise HTTPException(status_code=404, detail="User avatar not found")

    return db_user.image_uri


def delete_user(user_id: int, db: Session):
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    db_order = db.query(Order).filter(Order.user_id == user_id).all()
    for order in db_order:
        db.delete(order)

    db.delete(user)
    db.commit()
    return {"message": "Successfully delete user"}
