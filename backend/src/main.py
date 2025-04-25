from fastapi import FastAPI
from .database.core import engine, Base
from .entities.todo import Todo
from .entities.user import User
from .api import register_routes
from .logging import configure_logging, LogLevels
import os

configure_logging(LogLevels.info)

app = FastAPI()

register_routes(app)