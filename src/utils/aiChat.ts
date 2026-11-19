export interface ChatMessage {
  id?: number;
  role: "user" | "assistant";
  content: string;
  createdAt?: string;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatStreamHandlers {
  onStart: (conversation: { id: string; title: string }) => void;
  onDelta: (delta: string) => void;
}

interface StreamEvent {
  type: "start" | "delta" | "error" | "done";
  conversationId?: string;
  title?: string;
  content?: string;
  message?: string;
}

const API_BASE = "/api";

function friendlyNetworkError(error: unknown): Error {
  if (error instanceof Error && error.name === "AbortError") return error;
  if (error instanceof TypeError) {
    return new Error("无法连接后端服务，请确认 FastAPI 已在 8000 端口启动。");
  }
  return error instanceof Error ? error : new Error("请求失败，请稍后重试。");
}

async function describeError(response: Response): Promise<string> {
  if (response.status >= 500) {
    return `后端服务不可用（${response.status}），请确认 FastAPI 已在 8000 端口启动。`;
  }

  let detail = "";
  try {
    const data = (await response.json()) as { detail?: unknown };
    if (typeof data.detail === "string") detail = data.detail;
  } catch {
    detail = "";
  }
  return `请求失败（${response.status}）${detail ? `：${detail}` : ""}`;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    });
  } catch (error) {
    throw friendlyNetworkError(error);
  }

  if (!response.ok) throw new Error(await describeError(response));
  return (await response.json()) as T;
}

export function listConversations(): Promise<Conversation[]> {
  return request<Conversation[]>("/conversations");
}

export function getMessages(conversationId: string): Promise<ChatMessage[]> {
  return request<ChatMessage[]>(`/conversations/${conversationId}/messages`);
}

export async function deleteConversation(
  conversationId: string
): Promise<void> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE}/conversations/${conversationId}`, {
      method: "DELETE",
    });
  } catch (error) {
    throw friendlyNetworkError(error);
  }

  if (!response.ok) throw new Error(await describeError(response));
}

/**
 * 向后端发起流式对话。服务端以 SSE 返回 start / delta / error / done 事件，
 * 这里只负责解析并回调，模型 Key 完全由后端持有。
 */
export async function streamChat(
  content: string,
  conversationId: string | null,
  handlers: ChatStreamHandlers,
  signal?: AbortSignal
): Promise<void> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE}/chat/stream`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, conversationId }),
      signal,
    });
  } catch (error) {
    throw friendlyNetworkError(error);
  }

  if (!response.ok) throw new Error(await describeError(response));
  if (!response.body) throw new Error("当前浏览器不支持流式响应。");

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  const handleLine = (line: string): boolean => {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) return false;

    const payload = trimmed.slice(5).trim();
    if (!payload) return false;

    let event: StreamEvent;
    try {
      event = JSON.parse(payload) as StreamEvent;
    } catch {
      return false;
    }

    if (event.type === "delta" && event.content) {
      handlers.onDelta(event.content);
    } else if (event.type === "start" && event.conversationId) {
      handlers.onStart({
        id: event.conversationId,
        title: event.title || "新对话",
      });
    } else if (event.type === "error") {
      throw new Error(event.message || "模型服务返回错误。");
    } else if (event.type === "done") {
      return true;
    }

    return false;
  };

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    let newlineIndex = buffer.indexOf("\n");
    while (newlineIndex !== -1) {
      const line = buffer.slice(0, newlineIndex);
      buffer = buffer.slice(newlineIndex + 1);
      newlineIndex = buffer.indexOf("\n");

      if (handleLine(line)) return;
    }
  }
}
