from fastapi import APIRouter, HTTPException
from sqlalchemy import delete, select

from ..db import SessionLocal
from ..models import Conversation, Message
from ..schemas import ConversationOut, MessageOut

router = APIRouter(prefix="/api/conversations", tags=["conversations"])


@router.get("", response_model=list[ConversationOut])
async def list_conversations() -> list[ConversationOut]:
    async with SessionLocal() as session:
        result = await session.execute(
            select(Conversation).order_by(Conversation.updated_at.desc())
        )
        return [ConversationOut.model_validate(item) for item in result.scalars()]


@router.get("/{conversation_id}/messages", response_model=list[MessageOut])
async def list_messages(conversation_id: str) -> list[MessageOut]:
    async with SessionLocal() as session:
        conversation = await session.get(Conversation, conversation_id)
        if conversation is None:
            raise HTTPException(status_code=404, detail="会话不存在")

        result = await session.execute(
            select(Message)
            .where(Message.conversation_id == conversation_id)
            .order_by(Message.id.asc())
        )
        return [MessageOut.model_validate(item) for item in result.scalars()]


@router.delete("/{conversation_id}", status_code=204)
async def remove_conversation(conversation_id: str) -> None:
    async with SessionLocal() as session:
        conversation = await session.get(Conversation, conversation_id)
        if conversation is None:
            raise HTTPException(status_code=404, detail="会话不存在")

        await session.execute(
            delete(Message).where(Message.conversation_id == conversation_id)
        )
        await session.delete(conversation)
        await session.commit()
