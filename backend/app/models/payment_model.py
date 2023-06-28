from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, DateTime

from sqlalchemy.orm import relationship
from app.db.base_class import Base


class Payment(Base):
    id = Column(Integer, primary_key=True, index=True)
    code = Column(String)
    money = Column(String)
    payment_content = Column(String)
    status = Column(
        String
    )  # trạng thái thành công: vnp_ResponseCode === "00" , không thành công -> số khác
    bank_code = Column(String)
    payment_date = Column(DateTime(timezone=True))
    order_id = Column(Integer, ForeignKey("orders.id"))

    order = relationship("Order", back_populates="payment")
