from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict

class InventoryBase(BaseModel):
    nombre: str
    creado_en: datetime
    usuario_id: int
    
class InventoryUpdate(BaseModel):
    nombre: Optional[str]

class InventoryResponse(InventoryBase):
    id: int
    model_config = ConfigDict(from_attributes=True)