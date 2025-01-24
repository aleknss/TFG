from motor.motor_asyncio import AsyncIOMotorClient
from odmantic import AIOEngine
from core.config import settings

client = AsyncIOMotorClient(settings.mongo_uri)
engine = AIOEngine(client=client, database=settings.database_name)