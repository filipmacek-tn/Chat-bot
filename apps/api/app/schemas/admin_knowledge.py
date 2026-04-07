from datetime import datetime

from pydantic import BaseModel


class KnowledgeItemCreate(BaseModel):
    title: str
    body: str
    category: str = "ogolne"
    language: str = "pl"
    audience: str = "wszyscy"
    tags: str | None = None
    status: str = "draft"


class KnowledgeItemUpdate(BaseModel):
    title: str
    body: str
    category: str = "ogolne"
    language: str = "pl"
    audience: str = "wszyscy"
    tags: str | None = None
    status: str = "draft"


class KnowledgeItemResponse(BaseModel):
    id: int
    title: str
    body: str
    category: str
    language: str
    audience: str
    tags: str | None
    status: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True