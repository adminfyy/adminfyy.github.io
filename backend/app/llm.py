import codecs
import json
from collections.abc import AsyncIterator

import httpx

from .config import settings


class LLMError(Exception):
    pass


def _describe_error(status: int, body: str) -> str:
    if status == 401:
        return "模型服务鉴权失败（401），请检查 backend/.env 中的 LLM_API_KEY。"
    if status == 429:
        return "模型服务限流或额度不足（429），请稍后再试。"

    detail = ""
    try:
        payload = json.loads(body)
        detail = (payload.get("error") or {}).get("message") or ""
    except (json.JSONDecodeError, AttributeError):
        detail = body[:200]

    suffix = f"：{detail}" if detail else ""
    return f"模型服务返回错误（{status}）{suffix}"


def _extract_delta(data: str) -> str:
    try:
        event = json.loads(data)
    except json.JSONDecodeError:
        return ""

    choices = event.get("choices") or []
    if not choices:
        return ""
    return (choices[0].get("delta") or {}).get("content") or ""


async def stream_completion(messages: list[dict[str, str]]) -> AsyncIterator[str]:
    url = f"{settings.llm_base_url.rstrip('/')}/chat/completions"
    payload = {
        "model": settings.llm_model,
        "messages": messages,
        "temperature": settings.llm_temperature,
        "stream": True,
    }
    headers = {
        "Authorization": f"Bearer {settings.llm_api_key}",
        "Content-Type": "application/json",
    }
    timeout = httpx.Timeout(connect=10.0, read=180.0, write=30.0, pool=10.0)

    async with httpx.AsyncClient(timeout=timeout) as client:
        async with client.stream("POST", url, json=payload, headers=headers) as response:
            if response.status_code >= 400:
                body = (await response.aread()).decode("utf-8", "ignore")
                raise LLMError(_describe_error(response.status_code, body))

            # SSE 规范固定使用 UTF-8，不能依赖响应头里的 charset
            decoder = codecs.getincrementaldecoder("utf-8")()
            buffer = ""

            async for chunk in response.aiter_bytes():
                buffer += decoder.decode(chunk)

                while "\n" in buffer:
                    raw_line, buffer = buffer.split("\n", 1)
                    line = raw_line.strip()
                    if not line.startswith("data:"):
                        continue

                    data = line[5:].strip()
                    if not data:
                        continue
                    if data == "[DONE]":
                        return

                    delta = _extract_delta(data)
                    if delta:
                        yield delta
