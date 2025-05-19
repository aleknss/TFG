from sqlalchemy.orm import Session
from . import models
from src.entities.item import Item
from src.exceptions import ItemCreationError, ItemNotFoundError
import logging

def create_item(db: Session, item: models.ItemBase) -> Item:
    try:
        new_item = Item(**item.model_dump())
        db.add(new_item)
        db.commit()
        db.refresh(new_item)
        logging.info(f"Created new item")
        return new_item
    except Exception as e:
        logging.error(f"Failed to create item. Error: {str(e)}")
        raise ItemCreationError(str(e))

def get_items(db: Session) -> list[models.ItemResponse]:
    items = db.query(Item).all()
    logging.info(f"Retrieved {len(items)} items")
    return items

def get_item_by_id(db: Session, item_id: int) -> Item:
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        logging.warning(f"Item {item_id} not found with id {item_id}")
        raise ItemNotFoundError(item_id)
    logging.info(f"Retrieved item {item_id} with id {item_id}")
    return item

def get_item_by_inventory(db: Session, inventory_id: int) -> list[Item]:
    items = db.query(Item).filter(Item.inventario_id == inventory_id).all()
    logging.info(f"Retrieved {len(items)} items")
    return items

def update_item(db: Session, item_id: int, item_update: models.ItemUpdate) -> Item:
    item_data = item_update.model_dump(exclude_unset=True)
    db.query(Item).filter(Item.id == item_id).update(item_data)
    db.commit()
    logging.info(f"Successfully updated item {item_id}")
    return get_item_by_id(db, item_id)

def timestamp_item(db: Session, item_id: int, item_timestamp: models.ItemTimestamp) -> Item:
    item_data = item_timestamp.model_dump(exclude_unset=True)
    db.query(Item).filter(Item.id == item_id).update(item_data)
    db.commit()
    logging.info(f"Successfully updated item {item_id}")
    return get_item_by_id(db, item_id)
