from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


def to_camel(name: str) -> str:
    head, *rest = name.split("_")
    return head + "".join(part.capitalize() for part in rest)


class APIModel(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True,
    )


class ConversationOut(APIModel):
    id: str
    title: str
    created_at: datetime
    updated_at: datetime


class MessageOut(APIModel):
    id: int
    role: str
    content: str
    created_at: datetime


class ChatRequest(APIModel):
    conversation_id: str | None = None
    content: str = Field(min_length=1, max_length=4000)
