from beanie import PydanticObjectId
from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime, timezone
from typing import List

from db.models.user import User
from db.models.chats import Conversation, Message

from enum import Enum
from pydantic import BaseModel

from utils.deps import get_current_user

router = APIRouter(prefix="/chat", tags=["Chat"])

class MessageRole(str, Enum):
    USER = "user"
    ASSISTANT = "assistant"

class CreateSessionRequest(BaseModel):
    session_name: str

class MessageResponse(BaseModel):
    message_index: str
    content: str
    role: MessageRole
    created_at: datetime

class SessionDetail(BaseModel):

    session_id: str
    title: str
    created_at: datetime
    updated_at: datetime
    messages: List[MessageResponse]
    is_active: bool

@router.get("/conversations/active-session")
async def get_active_conversation(user: User = Depends(get_current_user)):

    conversation = (
        await Conversation.find(Conversation.user == user.id, Conversation.is_active == True)
        .sort("-updated_at")
        .first_or_none()
    )

    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")

    return {"conversation_id": str(conversation.id)}


@router.post("/activate/session/{conversation_id}")
async def activate_session(conversation_id: str, user: User = Depends(get_current_user)):
    try:
        conversation_object_id = PydanticObjectId(conversation_id)
    except Exception:
        raise HTTPException(status_code=404, detail="Conversation not found")

    await Conversation.find(Conversation.user == user.id, Conversation.is_active == True).update_many({
        "$set": {"is_active": False}
    })
    await Conversation.find_one(Conversation.user == user.id, Conversation.id == conversation_object_id).update({
        "$set": {"is_active": True}
    })
    return {"Sessions set to active": conversation_id}
@router.post("/new")
async def create_chat(
        request: CreateSessionRequest,
        current_user: User = Depends(get_current_user)):

    await Conversation.find(Conversation.user == current_user.id, Conversation.is_active == True).update_many({
        "$set": {"is_active": False}
    })

    convo = Conversation(
        user=current_user.id,
        title=request.session_name,
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc),
        messages=[],
        is_active=True,
    )
    await convo.insert()
    return {"conversation_id": str(convo.id)}

async def _fetch_messages(conversation: Conversation):
    return (
        await Message.find(Message.conversation == conversation).sort("index_id").to_list()
    )
@router.get("/conversations/{conversation_id}")
async def get_conversation(conversation_id: str, user: User = Depends(get_current_user)):
    try:
        conversation_object_id = PydanticObjectId(conversation_id)
    except Exception:
        raise HTTPException(status_code=404, detail="Conversation not found")

    conversation = await Conversation.find_one(Conversation.id == conversation_object_id, Conversation.user == user.id)
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")

    fetched_messages = await _fetch_messages(conversation)

    messages = [
        MessageResponse(
            message_index=str(msg.index_id),
            content=msg.content,
            role=msg.role,
            created_at=msg.created_at,
        )
        for msg in fetched_messages
    ]

    return SessionDetail(
        session_id=str(conversation.id),
        title=conversation.title,
        created_at=conversation.created_at,
        updated_at=conversation.updated_at,
        messages=messages,
        is_active=conversation.is_active,
    )

@router.get("/conversations/")
async def get_conversations(user: User = Depends(get_current_user)):
    conversations = (
        await Conversation.find(Conversation.user == user.id)
        .sort("-updated_at")
        .to_list()
    )

    if not conversations:
        raise HTTPException(status_code=404, detail="Conversations not found")

    response = [
        {
            "session_id": str(conv.id),
            "title": conv.title,
            "created_at": conv.created_at,
            "updated_at": conv.updated_at,
            "is_active": conv.is_active,
        }
        for conv in conversations
    ]

    return response


