from fastapi import FastAPI
from datetime import datetime
from app.routes.api_routes import api_router
from app.db.seeds import seed
from fastapi.middleware.cors import CORSMiddleware
import os

seed()

app = FastAPI()

origins = ["http://localhost:3000", os.getenv("FRONTEND_HOST")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
