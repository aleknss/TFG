# app/api/routes/inventarios.py
from fastapi import APIRouter, HTTPException
from bson import ObjectId
from services.inventarios import (
    create_inventario,
    get_inventario_by_id,
    get_inventarios_by_usuario,
    add_articulo_to_inventario,
)
from models.inventario import Inventario

router = APIRouter()

@router.post("/", response_model=Inventario)
async def crear_inventario(nombre: str, usuario_id: str):
    return await create_inventario(nombre, usuario_id)

@router.get("/{inventario_id}", response_model=Inventario)
async def obtener_inventario(inventario_id: str):
    inventario = await get_inventario_by_id(inventario_id)
    if not inventario:
        raise HTTPException(status_code=404, detail="Inventario no encontrado")
    return inventario

@router.get("/usuario/{usuario_id}", response_model=list[Inventario])
async def obtener_inventarios_por_usuario(usuario_id: str):
    return await get_inventarios_by_usuario(usuario_id)

@router.post("/{inventario_id}/articulos/{articulo_id}", response_model=Inventario)
async def agregar_articulo_a_inventario(inventario_id: str, articulo_id: str):
    return await add_articulo_to_inventario(inventario_id, articulo_id)