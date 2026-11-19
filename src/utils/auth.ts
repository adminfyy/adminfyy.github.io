export interface AuthStatus {
  required: boolean;
  authenticated: boolean;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`/api${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    });
  } catch {
    throw new Error("无法连接后端服务，请稍后重试。");
  }

  if (!response.ok) {
    let detail = "";
    try {
      const data = (await response.json()) as { detail?: unknown };
      if (typeof data.detail === "string") detail = data.detail;
    } catch {
      detail = "";
    }
    throw new Error(detail || `请求失败（${response.status}）`);
  }

  return (await response.json()) as T;
}

export function fetchAuthStatus(): Promise<AuthStatus> {
  return request<AuthStatus>("/auth/status");
}

export function login(password: string): Promise<AuthStatus> {
  return request<AuthStatus>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ password }),
  });
}

export async function logout(): Promise<void> {
  let response: Response;
  try {
    response = await fetch("/api/auth/logout", { method: "POST" });
  } catch {
    throw new Error("无法连接后端服务，请稍后重试。");
  }

  if (!response.ok) throw new Error(`退出失败（${response.status}）`);
}
