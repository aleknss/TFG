from fastapi import APIRouter, HTTPException
from bson import ObjectId
from services.articulos import (
    create_articulo,
    get_articulos_by_inventario,
)
from models.articulo import Articulo

router = APIRouter()

@router.post("/", response_model=Articulo)
async def crear_articulo(tipo: str, inventario_id: str, cantidad: int, color: str):
    return await create_articulo(tipo, inventario_id, cantidad, color)

@router.get("/inventario/{inventario_id}", response_model=list[Articulo])
async def obtener_articulos_por_inventario(inventario_id: str):
    return await get_articulos_by_inventario(inventario_id)