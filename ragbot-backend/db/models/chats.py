from __future__ import annotations
from typing import TYPE_CHECKING, List
from datetime import datetime, timezone
from enum import Enum
from beanie import Document, Link, PydanticObjectId
from pydantic import Field

# Import only for type checking (avoids circular import)
if TYPE_CHECKING:
    from db.models.user import User

class MessageRole(str, Enum):
    USER = "user"
    ASSISTANT = "assistant"

class Message(Document):
    conversation: PydanticObjectId
    role: MessageRole
    content: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    index_id: int

    class Settings:
        name = "messages"

class Conversation(Document):
    user: PydanticObjectId
    title: str = "New Conversation"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    is_active: bool = False
    messages: List[Link["Message"]] = Field(default_factory=list)

    class Settings:
        name = "conversations"
