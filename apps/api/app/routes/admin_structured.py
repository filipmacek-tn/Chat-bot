from fastapi import APIRouter

router = APIRouter(tags=["admin-structured"])


@router.get("/structured-records")
def list_structured_records():
    return {"items": [], "message": "Moduł danych strukturalnych gotowy do rozbudowy"}
