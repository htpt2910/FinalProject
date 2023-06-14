from sqlalchemy import Boolean, Column, Integer, String

from app.db.base_class import Base


class Product(Base):
    id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String, index=True)
    breed = Column(String, index=True)
    desc = Column(String)
    quantity = Column(Integer)
    price = Column(String, index=True)
    image_uri = Column(String)
    is_active = Column(Boolean, default=True)
