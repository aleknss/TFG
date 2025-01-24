from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    mongo_uri: str = "mongodb+srv://acceso:m1lMpHAgEgS1vFNt@tfg.g2ata.mongodb.net/?retryWrites=true&w=majority&appName=tfg"
    database_name: str = "tfg"

    class Config:
        env_file = ".env"

settings = Settings()