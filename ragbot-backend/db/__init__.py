from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie

from db.models.user import User
from db.models.chats import Conversation, Message

async def init_db():
    MONGODB_URI = "mongodb+srv://kushagrasingh1100_db_user:harsh@cluster0.0kdb96e.mongodb.net/?appName=Cluster0"

    client  = AsyncIOMotorClient(MONGODB_URI)

    await init_beanie(
        database=client["amibot"],
        document_models=[User, Conversation, Message],
    )
