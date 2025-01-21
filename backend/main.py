from fastapi import FastAPI
from core.database import get_engine
from api.routes import usuarios, inventarios, articulos

app = FastAPI(title="Gestión de Inventarios")

# Inicializar ODMantic
engine = get_engine()

# Incluir rutas
app.include_router(usuarios.router, prefix="/usuarios", tags=["Usuarios"])
app.include_router(inventarios.router, prefix="/inventarios", tags=["Inventarios"])
app.include_router(articulos.router, prefix="/articulos", tags=["Artículos"])
