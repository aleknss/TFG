from bson import ObjectId
from models.inventario import Inventario
from core.database import engine
from typing import List, Optional

async def create_inventario(nombre: str, usuario_id: str) -> Inventario:
    inventario = Inventario(nombre=nombre, usuario_id=usuario_id)
    await engine.save(inventario)
    return inventario

async def get_inventario_by_id(inventario_id: str) -> Optional[Inventario]:
    return await engine.find_one(Inventario, Inventario.id == ObjectId(inventario_id))

async def get_inventarios_by_usuario(usuario_id: str) -> List[Inventario]:
    return await engine.find(Inventario, Inventario.usuario_id == usuario_id)

async def add_articulo_to_inventario(inventario_id: str, articulo_id: str) -> Inventario:
    inventario = await get_inventario_by_id(inventario_id)
    if inventario:
        inventario.articulos.append(articulo_id)
        await engine.save(inventario)
    return inventario