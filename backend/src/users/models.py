from pydantic import BaseModel, EmailStr
from uuid import UUID
from datetime import datetime


class UserResponse(BaseModel):
    id: int
    email: EmailStr
    username: str
    url_imagen: str
    descripcion: str

class PasswordChange(BaseModel):
    current_password: str
    new_password: str
    new_password_confirm: str
