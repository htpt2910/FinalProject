from sqlalchemy import Boolean, Column, Integer, String, ARRAY

from sqlalchemy.orm import relationship
from app.db.base_class import Base


class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    role = Column(Integer)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    phone = Column(String, unique=True)
    address = Column(String)
    cart = Column(ARRAY(Integer))
    image_uri = Column(String)
    is_active = Column(Boolean, default=True)

    orders = relationship("Order", back_populates="user")
