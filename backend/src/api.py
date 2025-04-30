from fastapi import FastAPI
from src.auth.controller import router as auth_router
from src.users.controller import router as users_router
from src.items.controller import router as items_router
from src.inventories.controller import router as inventories_router
from src.img.avatar import router as avatar_router
from src.history.controller import router as history_router

def register_routes(app: FastAPI):
    app.include_router(auth_router)
    app.include_router(users_router)
    app.include_router(inventories_router)
    app.include_router(items_router)
    app.include_router(history_router)
    app.include_router(avatar_router)
