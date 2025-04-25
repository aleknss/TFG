from datetime import datetime, timezone
from sqlalchemy.orm import Session
from fastapi import HTTPException
from . import models
from src.entities.inventory import Inventory
from src.exceptions import InventoryCreationError, InventoryNotFoundError
import logging

def create_inventory(db: Session, inventory: models.InventoryBase) -> Inventory:
    try:
        new_inventory = Inventory(**inventory.model_dump())
        db.add(new_inventory)
        db.commit()
        db.refresh(new_inventory)
        logging.info(f"Created new inventory")
        return new_inventory
    except Exception as e:
        logging.error(f"Failed to create inventory. Error: {str(e)}")
        raise InventoryCreationError(str(e))

def get_inventories(db: Session) -> list[models.InventoryResponse]:
    inventories = db.query(Inventory).all()
    logging.info(f"Retrieved {len(inventories)} inventories")
    return inventories

def get_inventories_by_user(usuario_id: int, db: Session) -> list[models.InventoryResponse]:
    inventories = db.query(Inventory).filter(Inventory.usuario_id == usuario_id).all()
    logging.info(f"Retrieved {len(inventories)} inventories")
    return inventories

def get_inventory_by_id(db: Session, inventory_id: int) -> Inventory:
    inventory = db.query(Inventory).filter(Inventory.id == inventory_id).first()
    if not inventory:
        logging.warning(f"Inventory {inventory_id} not found with id {inventory_id}")
        raise InventoryNotFoundError(inventory_id)
    logging.info(f"Retrieved inventory {inventory_id} with id {inventory_id}")
    return inventory

def update_inventory(db: Session, inventory_id: int, inventory_update: models.InventoryUpdate) -> Inventory:
    inventory_data = inventory_update.model_dump(exclude_unset=True)
    db.query(Inventory).filter(Inventory.id == inventory_id).update(inventory_data)
    db.commit()
    logging.info(f"Successfully updated inventory {inventory_id}")
    return get_inventory_by_id(db, inventory_id)

def delete_inventory(db: Session, inventory_id: int) -> None:
    inventory = get_inventory_by_id(db, inventory_id)
    db.delete(inventory)
    db.commit()
    logging.info(f"Inventory {inventory_id} deleted")