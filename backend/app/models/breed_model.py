from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class Breed(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    desc = Column(String)
    is_active = Column(Boolean, default=True)

    products = relationship("Product", back_populates="breed")
