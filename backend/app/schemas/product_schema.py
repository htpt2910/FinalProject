from typing import Optional, TYPE_CHECKING
from pydantic import BaseModel

if TYPE_CHECKING:
    from .breed_schema import Breed


class ProductBase(BaseModel):
    product_name: Optional[str] = None
    breed_id: Optional[int] = None
    desc: Optional[str] = None
    price: Optional[int] = None
    age: Optional[str] = None
    image_uri: Optional[str] = None
    order_id: Optional[int] = None


class ProductCreate(ProductBase):
    pass


class ProductUpdate(ProductBase):
    pass


class Product(ProductBase):
    id: int
    is_active: bool

    breed: Optional["Breed"] = None

    class Config:
        orm_mode = True


from .breed_schema import Breed

Product.update_forward_refs()
