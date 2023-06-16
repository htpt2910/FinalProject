from sqlalchemy import Boolean, Column, Integer, String

from app.db.base_class import Base


class User(Base):
    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    phone = Column(String, unique=True, index=True)
    image_uri = Column(String)
    is_active = Column(Boolean, default=True)
