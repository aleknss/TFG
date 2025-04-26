from datetime import datetime
from pydantic import BaseModel, ConfigDict

class HistoryBase(BaseModel):
    articulo_id: int
    cantidad: int
    fecha_registro: datetime
    
class HistoryResponse(HistoryBase):
    id: int
    model_config = ConfigDict(from_attributes=True)