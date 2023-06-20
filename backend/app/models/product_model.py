from sqlalchemy import Boolean, Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class Product(Base):
    id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String, index=True)
    desc = Column(String)
    quantity = Column(Integer)
    price = Column(String)
    image_uri = Column(String)
    is_active = Column(Boolean, default=True)
    breed_id = Column(Integer, ForeignKey("breeds.id"))

    breed = relationship("Breed", back_populates="products")
