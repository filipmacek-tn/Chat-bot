from datetime import datetime

from pydantic import BaseModel


class DocumentResponse(BaseModel):
    id: int
    title: str
    original_filename: str
    stored_filename: str
    mime_type: str
    category: str
    language: str
    audience: str
    status: str
    description: str | None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True