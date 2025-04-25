from uuid import UUID
from pydantic import BaseModel, EmailStr

class RegisterUserRequest(BaseModel):
    email: EmailStr
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    
class TokenData(BaseModel):
    user_id: str | None = None