from fastapi import APIRouter, status
from typing import List

from ..database.core import DbSession
from . import  models
from . import service
from ..auth.service import CurrentUser

router = APIRouter(
    prefix="/items",
    tags=["Items"]
)
@router.post("/", response_model=models.ItemResponse, status_code=status.HTTP_201_CREATED)
def create_item(db: DbSession, item: models.ItemBase):
    return service.create_item(db, item)


@router.get("/", response_model=List[models.ItemResponse])
def get_items(db: DbSession):
    return service.get_items(db)

@router.get("/inv/{inventory_id}", response_model=List[models.ItemResponse])
def get_item_by_inventory(db: DbSession, inventory_id: int):
    return service.get_item_by_inventory(db, inventory_id)

@router.get("/{item_id}", response_model=models.ItemResponse)
def get_item(db: DbSession, item_id: int):
    return service.get_item_by_id(db, item_id)

@router.put("/{item_id}", response_model=models.ItemResponse)
def update_item(db: DbSession, item_id: int, item_update: models.ItemUpdate):
    return service.update_item(db, item_id, item_update)

@router.put("/{item_id}/timestamp", response_model=models.ItemResponse)
def timestamp_item(db: DbSession, item_id: int, item_timestamp: models.ItemTimestamp):
    return service.timestamp_item(db, item_id, item_timestamp)