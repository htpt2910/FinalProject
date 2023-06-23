from sqlalchemy import Boolean, Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class Product(Base):
    id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String, index=True)
    age = Column(String)
    desc = Column(String)
    price = Column(Integer)
    image_uri = Column(String)
    is_active = Column(Boolean, default=True)
    breed_id = Column(Integer, ForeignKey("breeds.id"))
    order_id = Column(Integer, ForeignKey("orders.id"))
    cart_id = Column(Integer, ForeignKey("carts.id"))

    breed = relationship("Breed", back_populates="products")
    order = relationship("Order", back_populates="products")
    cart = relationship("Cart", back_populates="products")
