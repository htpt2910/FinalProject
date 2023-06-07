from fastapi import FastAPI, APIRouter
from app.routes.user_routes import user_router
from app.routes.product_routes import product_router
from app.routes.breed_routes import breed_router

api_router = APIRouter()

api_router.include_router(user_router, prefix="/users")
api_router.include_router(product_router, prefix="/products")
api_router.include_router(breed_router, prefix="/breeds")
