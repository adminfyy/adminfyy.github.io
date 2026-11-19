from datetime import datetime, timezone

from pydantic import BaseModel, ConfigDict, Field, field_serializer


def to_camel(name: str) -> str:
    head, *rest = name.split("_")
    return head + "".join(part.capitalize() for part in rest)


class APIModel(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True,
    )

    @field_serializer("created_at", "updated_at", check_fields=False)
    def serialize_datetime(self, value: datetime | None) -> str | None:
        """数据库存的是无时区 UTC，这里补上时区，避免前端按本地时间解析。"""
        if value is None:
            return None
        if value.tzinfo is None:
            value = value.replace(tzinfo=timezone.utc)
        return value.isoformat().replace("+00:00", "Z")


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
