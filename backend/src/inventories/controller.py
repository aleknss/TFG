from fastapi import APIRouter, status
from typing import List

from ..database.core import DbSession
from . import  models
from . import service
from ..auth.service import CurrentUser
from src.items.service import create_item
from src.items.models import ItemBase

router = APIRouter(
    prefix="/inventories",
    tags=["Inventories"]
)
@router.post("/", response_model=models.InventoryResponse, status_code=status.HTTP_201_CREATED)
def create_inventory(db: DbSession, inventory: models.InventoryBase):
    created_inventory = service.create_inventory(db, inventory)
    if not created_inventory or not hasattr(created_inventory, 'id'):
        raise Exception("Error")

    inventory_id = created_inventory.id

    # crear 3 items asignados a este inventario, uno con color "Amarillo", otro con color "Azul" y otro con color "Rojo"
    item_object_list: List[ItemBase] = [
        ItemBase(color="Amarillo", cantidad_actual=0, descripcion="", nombre="Artículo 1", inventario_id=inventory_id),
        ItemBase(color="Azul", cantidad_actual=0, descripcion="", nombre="Artículo 2", inventario_id=inventory_id),
        ItemBase(color="Rojo", cantidad_actual=0, descripcion="", nombre="Artículo 3", inventario_id=inventory_id),
    ]
    for item_obj in item_object_list:
        create_item(db, item_obj)

    return created_inventory    


@router.get("/", response_model=List[models.InventoryResponse])
def get_inventories(db: DbSession):
    return service.get_inventories(db)

@router.get("/{inventory_id}", response_model=models.InventoryResponse)
def get_inventory(db: DbSession, inventory_id: int):
    return service.get_inventory_by_id(db, inventory_id)

@router.put("/{inventory_id}", response_model=models.InventoryResponse)
def update_inventory(db: DbSession, inventory_id: int, inventory_update: models.InventoryUpdate):
    return service.update_inventory(db, inventory_id, inventory_update)

@router.delete("/{inventory_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_inventory(db: DbSession, inventory_id: int):
    service.delete_inventory(db, inventory_id)