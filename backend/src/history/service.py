from datetime import datetime, timezone
from sqlalchemy.orm import Session
from fastapi import HTTPException
from . import models
from src.auth.models import TokenData
from src.entities.history import History
from src.exceptions import HistoryNotFoundError
import logging

def get_all_history(db: Session) -> list[models.HistoryResponse]:
    items = db.query(History).all()
    logging.info(f"Retrieved {len(items)} items")
    return items

def get_history_by_articulo(db: Session, articulo_id: int) -> History:
    item = db.query(History).filter(History.articulo_id == articulo_id).first()
    if not item:
        logging.warning(f"Item not found with id {articulo_id}")
        raise HistoryNotFoundError(articulo_id)
    logging.info(f"Retrieved item with id {articulo_id}")
    return item

def get_last_ten_history_by_articulo(db: Session, articulo_id: int) -> list[History]:
    items = db.query(History).filter(History.articulo_id == articulo_id).order_by(History.fecha_registro.desc()).limit(10).all()
    logging.info(f"Retrieved {len(items)} items")
    return items