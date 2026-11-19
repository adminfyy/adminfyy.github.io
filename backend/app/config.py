from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
DATA_DIR.mkdir(parents=True, exist_ok=True)


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=BASE_DIR / ".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    llm_base_url: str = "https://dashscope.aliyuncs.com/compatible-mode/v1"
    llm_api_key: str = ""
    llm_model: str = "qwen-plus"
    llm_temperature: float = 0.7
    system_prompt: str = (
        "你是「技术改变生活」站点的 AI 助手，用简体中文简洁回答，必要时给出可运行的代码示例。"
        "站点作者是 adminfoo，前端工程师，9 年以上经验，技术栈包括 Vue2 / Vue3、React、"
        "Electron 桌面端与 HarmonyOS 应用，base 厦门，目前正在寻找前端岗位机会。"
        "当用户询问作者经历、技能或求职意向时，基于以上信息回答；不确定的内容不要编造。"
    )
    history_limit: int = 20
    access_password: str = ""
    cors_origins: str = (
        "http://localhost:5173,http://localhost:5174,"
        "http://127.0.0.1:5173,http://127.0.0.1:5174"
    )
    database_url: str = f"sqlite+aiosqlite:///{(DATA_DIR / 'app.db').as_posix()}"

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


settings = Settings()
