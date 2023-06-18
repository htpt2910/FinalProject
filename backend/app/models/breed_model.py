from sqlalchemy import Boolean, Column, Integer, String

from app.db.database import Base


class Breed(Base):
    __tablename__ = "breeds"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    desc = Column(String)
    is_active = Column(Boolean, default=True)
