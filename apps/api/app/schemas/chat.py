from pydantic import BaseModel


class ChatRequest(BaseModel):
    user_text: str
    session_id: str | None = None


class ChatResponse(BaseModel):
    answer: str