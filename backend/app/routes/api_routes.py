from fastapi import FastAPI, APIRouter
from app.routes.user_routes import user_router
from app.routes.product_routes import product_router
from app.routes.breed_routes import breed_router
from app.routes.detect import detect_router
from app.routes.order_routes import order_router
from app.routes.service_routes import service_router
from app.routes.payment_routes import payment_router


api_router = APIRouter()

api_router.include_router(user_router, prefix="/users")
api_router.include_router(product_router, prefix="/products")
api_router.include_router(breed_router, prefix="/breeds")
api_router.include_router(detect_router, prefix="/detect")
api_router.include_router(order_router, prefix="/orders")
api_router.include_router(service_router, prefix="/services")
api_router.include_router(payment_router, prefix="/payment")
