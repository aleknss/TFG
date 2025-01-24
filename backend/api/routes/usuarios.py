# app/api/routes/usuarios.py
from fastapi import APIRouter, HTTPException
from bson import ObjectId
from services.usuarios import (
    create_usuario,
    get_usuario_by_id,
    authenticate_user,
)
from models.usuario import Usuario

router = APIRouter()

@router.post("/", response_model=Usuario)
async def crear_usuario(nombre: str, email: str, password: str):
    return await create_usuario(nombre, email, password)

@router.get("/{nombre}", response_model=Usuario)
async def obtener_usuario(nombre: str):
    usuario = await get_usuario_by_id(nombre)
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario

@router.post("/login")
async def login(email: str, password: str):
    usuario = await authenticate_user(email, password)
    if not usuario:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    return {"message": "Login exitoso", "usuario_id": str(usuario.id)}