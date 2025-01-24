from models.articulo import Articulo
from core.database import engine
from core.security import get_password_hash, verify_password
from typing import List, Optional

async def create_articulo( id: str,tipo: str, inventario_id: str, cantidad: int, color: str) -> Articulo:
    articulo = Articulo(id=id,tipo=tipo, inventario_id=inventario_id, cantidad=cantidad, color=color)
    await engine.save(articulo)
    return articulo

async def get_usuario_by_nombre(nombre: str) -> Optional[Articulo]:
    return await engine.find_one(Articulo, Articulo.nombre == nombre)

async def get_articulos_by_inventario(id: str) -> Optional[List[Articulo]]:
    return await engine.find(Articulo, Articulo.usuario_id == id)


async def delete_articulo(id: str) -> bool:
    inventario = await engine.find_one(Articulo, Articulo.id == id)
    if inventario:
        await engine.delete(inventario)
        return True
    return False