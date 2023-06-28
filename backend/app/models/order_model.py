from sqlalchemy import Boolean, Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base_class import Base
from app.models.payment_model import Payment


class Order(Base):
    id = Column(Integer, primary_key=True, index=True)
    type = Column(String)
    ordered_day = Column(DateTime(timezone=True), server_default=func.now())
    finished_day = Column(DateTime(timezone=True))
    total_price = Column(Integer)
    is_active = Column(Boolean, default=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    destination = Column(String)
    status = Column(Integer)

    user = relationship("User", back_populates="orders")
    products = relationship("Product", back_populates="order")
    services = relationship(
        "Service", secondary="orders_services", back_populates="orders"
    )
    payment = relationship("Payment", back_populates="order")
