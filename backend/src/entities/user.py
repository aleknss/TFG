from sqlalchemy import Column, String, Integer, Text
from ..database.core import Base 

class User(Base):
    __tablename__ = 'usuario'

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(255), unique=True, nullable=False)
    username = Column(String(255), nullable=False)
    password_hash = Column(String(255), nullable=False)
    descripcion = Column(Text, nullable=True)

    def __repr__(self):
        return f"<User(email='{self.email}', username='{self.username}')>"
