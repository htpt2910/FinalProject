from sqlalchemy import Boolean, Column, Table, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base_class import Base


class Service(Base):
    id = Column(Integer, primary_key=True, index=True)
    service_name = Column(String)
    price = Column(Integer)

    orders = relationship(
        "Order", secondary="orders_services", back_populates="services"
    )


orders_services = Table(
    "orders_services",
    Base.metadata,
    Column("order_id", ForeignKey("orders.id"), primary_key=True),
    Column("service_id", ForeignKey("services.id"), primary_key=True),
)
