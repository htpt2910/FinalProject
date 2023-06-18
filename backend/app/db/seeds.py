from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models.user_model import User
from app.models.product_model import Product
import time


def seeding(db: Session):
    if len(db.query(User).all()) == 0:
        for i in range(10):
            user = User(
                name=f"user{i}",
                email=f"user{i}@gmail.com",
                phone=f"012345678{i}",
            )
            db.add(user)
    if len(db.query(Product).all()) == 0:
        for j in range(10):
            product = Product(
                product_name=f"product{j}",
                breed=f"breed{j}",
                desc=f"desc{j}",
                quantity=f"{j}",
                price=f"{j}00$",
            )
            db.add(product)

    db.commit()


def seed():
    db = SessionLocal()
    try:
        while True:
            try:
                seeding(db)
                break
            except:
                time.sleep(10)
    finally:
        db.close()
