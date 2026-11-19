import json
from collections.abc import AsyncIterator

from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from sqlalchemy import select

from ..config import settings
from ..db import SessionLocal
from ..llm import LLMError, stream_completion
from ..models import Conversation, Message, utcnow
from ..schemas import ChatRequest

router = APIRouter(prefix="/api/chat", tags=["chat"])


def _sse(payload: dict) -> str:
    return f"data: {json.dumps(payload, ensure_ascii=False)}\n\n"


def _build_title(content: str) -> str:
    title = " ".join(content.split())
    return title[:24] or "新对话"


async def _load_history(session, conversation_id: str) -> list[dict[str, str]]:
    result = await session.execute(
        select(Message)
        .where(Message.conversation_id == conversation_id)
        .order_by(Message.id.desc())
        .limit(max(settings.history_limit, 1))
    )
    history = list(result.scalars())
    history.reverse()
    return [
        {"role": message.role, "content": message.content}
        for message in history
        if message.content
    ]


async def _event_stream(payload: ChatRequest) -> AsyncIterator[str]:
    async with SessionLocal() as session:
        conversation = None
        if payload.conversation_id:
            conversation = await session.get(Conversation, payload.conversation_id)
            if conversation is None:
                yield _sse({"type": "error", "message": "会话不存在，请新建对话后重试。"})
                yield _sse({"type": "done"})
                return
        else:
            conversation = Conversation(title=_build_title(payload.content))
            session.add(conversation)
            await session.flush()

        history = await _load_history(session, conversation.id)
        session.add(Message(conversation_id=conversation.id, role="user", content=payload.content))
        conversation.updated_at = utcnow()
        await session.commit()

        yield _sse(
            {
                "type": "start",
                "conversationId": conversation.id,
                "title": conversation.title,
            }
        )

        if not settings.llm_api_key:
            yield _sse(
                {
                    "type": "error",
                    "message": "未配置 LLM_API_KEY，请在 backend/.env 中填写后重启服务。",
                }
            )
            yield _sse({"type": "done"})
            return

        messages = [{"role": "system", "content": settings.system_prompt}]
        messages.extend(history)
        messages.append({"role": "user", "content": payload.content})

        collected: list[str] = []
        error_message = ""

        try:
            async for delta in stream_completion(messages):
                collected.append(delta)
                yield _sse({"type": "delta", "content": delta})
        except LLMError as exc:
            error_message = str(exc)
        except Exception:
            error_message = "模型服务连接失败，请检查后端日志与网络。"
        finally:
            answer = "".join(collected)
            if answer:
                session.add(
                    Message(conversation_id=conversation.id, role="assistant", content=answer)
                )
                conversation.updated_at = utcnow()
                await session.commit()

        if error_message:
            yield _sse({"type": "error", "message": error_message})
        yield _sse({"type": "done"})


@router.post("/stream")
async def chat_stream(payload: ChatRequest) -> StreamingResponse:
    return StreamingResponse(
        _event_stream(payload),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )
