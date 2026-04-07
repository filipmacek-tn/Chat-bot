import os
import shutil
import uuid

from fastapi import APIRouter, Depends, File, Form, UploadFile, HTTPException
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db
from app.core.security import get_current_admin
from app.models.document import Document
from app.schemas.admin_documents import DocumentResponse

router = APIRouter(prefix="/admin/documents", tags=["admin-documents"])


@router.get("", response_model=list[DocumentResponse])
async def list_documents(
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    return db.query(Document).order_by(Document.created_at.desc()).all()


@router.post("/upload", response_model=DocumentResponse)
async def upload_document(
    title: str = Form(...),
    category: str = Form("ogolne"),
    language: str = Form("pl"),
    audience: str = Form("wszyscy"),
    status: str = Form("draft"),
    description: str = Form(""),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    os.makedirs(settings.upload_dir, exist_ok=True)

    ext = os.path.splitext(file.filename)[1]
    stored_filename = f"{uuid.uuid4()}{ext}"
    stored_path = os.path.join(settings.upload_dir, stored_filename)

    with open(stored_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    document = Document(
        title=title,
        original_filename=file.filename,
        stored_filename=stored_filename,
        mime_type=file.content_type or "application/octet-stream",
        category=category,
        language=language,
        audience=audience,
        status=status,
        description=description or None,
    )

    db.add(document)
    db.commit()
    db.refresh(document)
    return document


@router.delete("/{document_id}")
async def delete_document(
    document_id: int,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    document = db.query(Document).filter(Document.id == document_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Dokument nie istnieje.")

    file_path = os.path.join(settings.upload_dir, document.stored_filename)
    if os.path.exists(file_path):
        os.remove(file_path)

    db.delete(document)
    db.commit()
    return {"ok": True}