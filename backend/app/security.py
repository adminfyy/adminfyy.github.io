import hashlib
import hmac

from fastapi import APIRouter, Cookie, HTTPException, Response
from pydantic import BaseModel

from .config import settings

COOKIE_NAME = "adminfyy_access"
COOKIE_MAX_AGE = 60 * 60 * 24 * 30


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
async def login(payload: LoginPayload, response: Response) -> AuthStatus:
    if not settings.access_password:
        return AuthStatus(required=False, authenticated=True)

    if not hmac.compare_digest(
        payload.password.encode(), settings.access_password.encode()
    ):
        raise HTTPException(status_code=401, detail="访问口令不正确。")

    response.set_cookie(
        COOKIE_NAME,
        _expected_token(),
        max_age=COOKIE_MAX_AGE,
        httponly=True,
        samesite="lax",
        path="/",
    )
    return AuthStatus(required=True, authenticated=True)


@auth_router.post("/logout", status_code=204)
async def logout(response: Response) -> None:
    response.delete_cookie(COOKIE_NAME, path="/")
