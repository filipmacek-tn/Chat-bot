from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_admin
from app.models.knowledge_item import KnowledgeItem
from app.schemas.admin_knowledge import (
    KnowledgeItemCreate,
    KnowledgeItemResponse,
    KnowledgeItemUpdate,
)

router = APIRouter(prefix="/admin/knowledge", tags=["admin-knowledge"])


@router.get("", response_model=list[KnowledgeItemResponse])
async def list_knowledge_items(
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    return db.query(KnowledgeItem).order_by(KnowledgeItem.created_at.desc()).all()


@router.post("", response_model=KnowledgeItemResponse)
async def create_knowledge_item(
    data: KnowledgeItemCreate,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    item = KnowledgeItem(**data.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.put("/{item_id}", response_model=KnowledgeItemResponse)
async def update_knowledge_item(
    item_id: int,
    data: KnowledgeItemUpdate,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    item = db.query(KnowledgeItem).filter(KnowledgeItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Wpis nie istnieje.")

    for key, value in data.model_dump().items():
        setattr(item, key, value)

    db.commit()
    db.refresh(item)
    return item


@router.delete("/{item_id}")
async def delete_knowledge_item(
    item_id: int,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    item = db.query(KnowledgeItem).filter(KnowledgeItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Wpis nie istnieje.")

    db.delete(item)
    db.commit()
    return {"ok": True}