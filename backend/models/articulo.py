from odmantic import Model

class Articulo(Model):
    tipo: str
    inventario_id: str
    cantidad: int
    color: str