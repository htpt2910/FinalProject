from sqlalchemy import Boolean, Column, Integer, String

from app.db.base_class import Base


class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    role = Column(Integer)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    phone = Column(String, unique=True)
    image_uri = Column(String)
    is_active = Column(Boolean, default=True)
