from fastapi import FastAPI
from core.database import engine
from api.routes import usuarios, inventarios, articulos
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicializar ODMantic
engine = engine

# Incluir rutas
app.include_router(usuarios.router, prefix="/usuarios", tags=["Usuarios"])
app.include_router(inventarios.router, prefix="/inventarios", tags=["Inventarios"])
app.include_router(articulos.router, prefix="/articulos", tags=["Artículos"])
