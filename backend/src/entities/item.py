from sqlalchemy import Column, String, Integer, Date
from ..database.core import Base 

class Item(Base):
    __tablename__ = 'articulo'

    id = Column(Integer, primary_key=True, autoincrement=True)
    inventario_id = Column(Integer, unique=False, nullable=False)
    nombre = Column(String(255), unique=True, nullable=False)
    color = Column(String(255), nullable=True)
    descripcion = Column(String(255), nullable=True)
    cantidad_actual = Column(Integer, nullable=False)


    def __repr__(self):
        return f"Inventario(id={self.id}, nombre={self.nombre}, creado_en={self.creado_en}, id_usuario={self.id_usuario})"
    