from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict

class ItemBase(BaseModel):
    inventario_id: int
    nombre: str
    color: str
    descripcion: str
    cantidad_actual: int
    
class ItemUpdate(BaseModel):
    nombre: str
    descripcion: str

class ItemTimestamp(BaseModel):
    cantidad_actual: int

class ItemResponse(ItemBase):
    id: int
    model_config = ConfigDict(from_attributes=True)