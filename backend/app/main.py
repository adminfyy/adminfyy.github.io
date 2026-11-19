from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from .config import settings
from .db import init_db
from .routers import chat, conversations
from .security import auth_router, require_auth

FRONTEND_DIR = Path(__file__).resolve().parents[2] / "docs"


@asynccontextmanager
async def lifespan(_: FastAPI):
    await init_db()
    yield


app = FastAPI(title="Adminfyy AI Chat", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(chat.router, dependencies=[Depends(require_auth)])
app.include_router(conversations.router, dependencies=[Depends(require_auth)])


@app.get("/api/health")
async def health() -> dict:
    return {
        "status": "ok",
        "model": settings.llm_model,
        "configured": bool(settings.llm_api_key),
    }


if (FRONTEND_DIR / "index.html").is_file():
    assets_dir = FRONTEND_DIR / "assets"
    if assets_dir.is_dir():
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    @app.get("/{full_path:path}", include_in_schema=False)
    async def spa_fallback(full_path: str) -> FileResponse:
        if full_path == "api" or full_path.startswith("api/"):
            raise HTTPException(status_code=404, detail="Not Found")

        candidate = (FRONTEND_DIR / full_path).resolve()
        if full_path and candidate.is_file() and FRONTEND_DIR in candidate.parents:
            return FileResponse(candidate)

        return FileResponse(FRONTEND_DIR / "index.html")
