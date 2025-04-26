from fastapi import APIRouter, status
from typing import List

from ..database.core import DbSession
from . import  models
from . import service

router = APIRouter(
    prefix="/history",
    tags=["History"]
)

@router.get("/", response_model=List[models.HistoryResponse])
def get_all_history(db: DbSession):
    return service.get_all_history(db)

@router.get("/{articulo_id}", response_model=models.HistoryResponse)
def get_history_by_articulo(db: DbSession, articulo_id: int):
    return service.get_history_by_articulo(db, articulo_id)

@router.get("/ten/{articulo_id}", response_model=List[models.HistoryResponse])
def get_last_ten_history_by_articulo(db: DbSession, articulo_id: int):
    return service.get_last_ten_history_by_articulo(db, articulo_id)