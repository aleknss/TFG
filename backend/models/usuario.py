from odmantic import Model, Field
from typing import List

class Usuario(Model):
    nombre: str
    email: str
    password: str
    inventarios: List[str] = Field(default_factory=list)