from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models.breed_model import Breed
from app.models.product_model import Product
import time
from app.ai.breed_classify import class_names


def seeding(db: Session):
    for breed_name in class_names:
        breed = Breed(
            name=breed_name,
            desc="Chihuahua is a breed of toy dog that originated in Mexico. They are named after the state of Chihuahua in northern Mexico. Chihuahuas are small dogs, typically weighing between 2 and 6 pounds, and standing between 6 and 10 inches tall at the shoulder. They have short, smooth coats that can come in a variety of colors, including fawn, black, white, and tan.",
        )

        db.add(breed)
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
