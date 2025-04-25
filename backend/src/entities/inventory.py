from sqlalchemy import Column, String, Integer, Date
from ..database.core import Base 

class Inventory(Base):
    __tablename__ = 'inventario'

    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(255), unique=True, nullable=False)
    creado_en = Column(Date, unique=False, nullable=False)
    usuario_id = Column(Integer, unique=False, nullable=False)
    url_imagen = Column(String(255), nullable=True)


    def __repr__(self):
        return f"Inventario(id={self.id}, nombre={self.nombre}, creado_en={self.creado_en}, id_usuario={self.id_usuario})"
    