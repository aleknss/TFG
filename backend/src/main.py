from fastapi import FastAPI
from .database.core import engine, Base
from .api import register_routes
from .logging import configure_logging, LogLevels
import os
from fastapi.middleware.cors import CORSMiddleware


configure_logging(LogLevels.info)

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True, 
    allow_methods=["*"],  
    allow_headers=["*"],  
)


register_routes(app)