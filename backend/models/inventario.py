# app/models/inventario.py
from odmantic import Model, Field
from typing import List

class Inventario(Model):
    nombre: str
    usuario_id: str
    articulos: List[str] = Field(default_factory=list)