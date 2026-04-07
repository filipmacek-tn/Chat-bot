from fastapi import APIRouter

router = APIRouter(tags=["admin-announcements"])


@router.get("/announcements")
def list_announcements():
    return {"items": [], "message": "Moduł ogłoszeń gotowy do rozbudowy"}
