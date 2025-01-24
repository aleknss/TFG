from models.usuario import Usuario
from core.database import engine
from core.security import get_password_hash, verify_password
from typing import List, Optional

async def create_usuario(nombre: str, email: str, password: str) -> Usuario:
    hashed_password = get_password_hash(password)
    usuario = Usuario(nombre=nombre, email=email, password=hashed_password)
    await engine.save(usuario)
    return usuario

async def get_usuario_by_id(usuario_id: str) -> Optional[Usuario]:
    return await engine.find_one(Usuario, Usuario.id == usuario_id)

async def get_usuario_by_email(email: str) -> Optional[Usuario]:
    return await engine.find_one(Usuario, Usuario.email == email)

async def authenticate_user(email: str, password: str) -> Optional[Usuario]:
    usuario = await get_usuario_by_email(email)
    if usuario and verify_password(password, usuario.password):
        return usuario
    return None

async def update_usuario(usuario_id: str, nombre: str, email: str) -> Optional[Usuario]:
    usuario = await engine.find_one(Usuario, Usuario.id == usuario_id)
    if usuario:
        usuario.nombre = nombre
        usuario.email = email
        await engine.save(usuario)
    return usuario

async def delete_usuario(usuario_id: str) -> bool:
    usuario = await engine.find_one(Usuario, Usuario.id == usuario_id)
    if usuario:
        await engine.delete(usuario)
        return True
    return False