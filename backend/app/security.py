import hashlib
import hmac
from collections import defaultdict
from time import monotonic

from fastapi import APIRouter, Cookie, HTTPException, Request, Response
from pydantic import BaseModel

from .config import settings

COOKIE_NAME = "adminfyy_access"
COOKIE_MAX_AGE = 60 * 60 * 24 * 30
LOGIN_MAX_FAILURES = 6
LOGIN_WINDOW_SECONDS = 300.0

_failed_logins: dict[str, list[float]] = defaultdict(list)


def _client_key(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for", "")
    if forwarded:
        candidate = forwarded.split(",")[0].strip()
        if candidate:
            return candidate
    return request.client.host if request.client else "unknown"


def _recent_failures(key: str) -> list[float]:
    cutoff = monotonic() - LOGIN_WINDOW_SECONDS
    attempts = [stamp for stamp in _failed_logins[key] if stamp > cutoff]
    _failed_logins[key] = attempts
    return attempts


def _is_https(request: Request) -> bool:
    if request.url.scheme == "https":
        return True
    proto = request.headers.get("x-forwarded-proto", "")
    return proto.split(",")[0].strip() == "https"


def _expected_token() -> str:
    return hashlib.sha256(f"adminfyy-access:{settings.access_password}".encode()).hexdigest()


def _is_authenticated(token: str | None) -> bool:
    if not settings.access_password:
        return True
    return bool(token) and hmac.compare_digest(token, _expected_token())


async def require_auth(
    access_token: str | None = Cookie(default=None, alias=COOKIE_NAME),
) -> None:
    if not _is_authenticated(access_token):
        raise HTTPException(status_code=401, detail="请先输入访问口令。")


class LoginPayload(BaseModel):
    password: str


class AuthStatus(BaseModel):
    required: bool
    authenticated: bool


auth_router = APIRouter(prefix="/api/auth", tags=["auth"])


@auth_router.get("/status", response_model=AuthStatus)
async def auth_status(
    access_token: str | None = Cookie(default=None, alias=COOKIE_NAME),
) -> AuthStatus:
    return AuthStatus(
        required=bool(settings.access_password),
        authenticated=_is_authenticated(access_token),
    )


@auth_router.post("/login", response_model=AuthStatus)
async def login(payload: LoginPayload, request: Request, response: Response) -> AuthStatus:
    if not settings.access_password:
        return AuthStatus(required=False, authenticated=True)

    client = _client_key(request)
    if len(_recent_failures(client)) >= LOGIN_MAX_FAILURES:
        raise HTTPException(status_code=429, detail="尝试次数过多，请 5 分钟后再试。")

    if not hmac.compare_digest(
        payload.password.encode(), settings.access_password.encode()
    ):
        _failed_logins[client].append(monotonic())
        raise HTTPException(status_code=401, detail="访问口令不正确。")

    _failed_logins.pop(client, None)
    response.set_cookie(
        COOKIE_NAME,
        _expected_token(),
        max_age=COOKIE_MAX_AGE,
        httponly=True,
        samesite="lax",
        secure=_is_https(request),
        path="/",
    )
    return AuthStatus(required=True, authenticated=True)


@auth_router.post("/logout", status_code=204)
async def logout(response: Response) -> None:
    response.delete_cookie(COOKIE_NAME, path="/")
