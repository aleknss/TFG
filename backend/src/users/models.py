from pydantic import BaseModel, EmailStr
from typing import Optional


class UserResponse(BaseModel):
    id: int
    email: EmailStr
    username: str
    descripcion: Optional[str] = None
    
class DescUpdate(BaseModel):
    descripcion: str
    
class PasswordChange(BaseModel):
    current_password: str
    new_password: str
    new_password_confirm: str
