from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import generate_chat_response

router = APIRouter(tags=["public-chat"])


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest, db: Session = Depends(get_db)):
    answer = await generate_chat_response(
        user_text=request.user_text,
        session_id=request.session_id,
        db=db,
    )
    return ChatResponse(answer=answer)