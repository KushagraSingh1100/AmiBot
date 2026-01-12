from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from datetime import datetime, timezone

from db.models.chats import Conversation, Message, MessageRole
from db.models.user import User
from utils.deps import get_current_user
from rag_pipeline import query_rag  # your existing RAG function

router = APIRouter(tags=["Query"])


class QueryRequest(BaseModel):
    query: str
    conversation_id: str


@router.post("/query")
async def query_endpoint(
    request: QueryRequest,
    user: User = Depends(get_current_user),
):
    convo = await Conversation.get(request.conversation_id)
    if not convo or convo.user.id != user.id:
        raise HTTPException(status_code=404, detail="Conversation not found")

    # Save user message
    user_msg = Message(
        conversation=convo,
        role=MessageRole.USER,
        content=request.query,
        index_id=len(convo.messages),
    )
    await user_msg.insert()

    convo.messages.append(user_msg)

    # RAG call
    answer = query_rag(request.query)

    # Save assistant message
    bot_msg = Message(
        conversation=convo,
        role=MessageRole.ASSISTANT,
        content=answer,
        index_id=len(convo.messages),
    )
    await bot_msg.insert()

    convo.messages.append(bot_msg)
    convo.updated_at = datetime.now(timezone.utc)
    await convo.save()

    return {
        "answer": answer,
        "conversation_id": str(convo.id),
    }
