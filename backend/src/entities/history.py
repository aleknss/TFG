from sqlalchemy import Column, String, Integer, Date
from ..database.core import Base 

class History(Base):
    __tablename__ = 'historico'

    id = Column(Integer, primary_key=True)
    articulo_id = Column(Integer, unique=False, nullable=False)
    cantidad = Column(Integer, nullable=False)
    fecha_registro = Column(Date, nullable=False)

    def __repr__(self):
        return f"History(id={self.id}, articulo_id={self.articulo_id}, cantidad={self.cantidad}, fecha_registro={self.fecha_registro})"