from sqlalchemy import String, JSON
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class StructuredRecord(Base):
    __tablename__ = "structured_records"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    record_type: Mapped[str] = mapped_column(String(120))
    payload_json: Mapped[dict] = mapped_column(JSON)
