from fastapi import FastAPI
from .database.core import engine, Base
from .api import register_routes
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from .logging import configure_logging, LogLevels
import os
from fastapi.middleware.cors import CORSMiddleware


configure_logging(LogLevels.info)

BASE_DIR = Path(__file__).resolve().parent
UPLOADS_DIR = BASE_DIR / "uploads"
UPLOAD_PFP = UPLOADS_DIR / "pfp"

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True, 
    allow_methods=["*"],  
    allow_headers=["*"],  
)

app.mount(
    "/static",
    StaticFiles(directory=str(UPLOADS_DIR)),
    name="static",
)

register_routes(app)