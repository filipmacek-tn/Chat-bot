from sqlalchemy.orm import Session

from app.adapters.llm_runtime import call_llm
from app.models.knowledge_item import KnowledgeItem

SESSION_MEMORY: dict[str, list[dict]] = {}
MAX_MESSAGES = 10


async def generate_chat_response(
    user_text: str,
    session_id: str | None,
    db: Session,
) -> str:
    if not session_id:
        session_id = "default-session"

    history = SESSION_MEMORY.get(session_id, [])

    knowledge_items = (
        db.query(KnowledgeItem)
        .filter(KnowledgeItem.status == "published")
        .order_by(KnowledgeItem.created_at.desc())
        .limit(8)
        .all()
    )

    knowledge_context = "\n\n".join(
        [f"{item.title}\n{item.body}" for item in knowledge_items]
    )

    system_message = {
        "role": "system",
        "content": (
            "Jesteś chatbotem szkolnym. "
            "Odpowiadaj krótko, jasno i w języku w którym akurat zadano ci pytanie. "
            "Jeśli masz informacje w dostarczonym kontekście, korzystaj z nich. "
            "Jeśli nie masz pewności, powiedz to wprost.\n\n"
            f"KONTEKST SZKOŁY:\n{knowledge_context}"
        ),
    }

    messages = [system_message] + history + [{"role": "user", "content": user_text}]
    answer = await call_llm(messages)

    history.append({"role": "user", "content": user_text})
    history.append({"role": "assistant", "content": answer})
    SESSION_MEMORY[session_id] = history[-MAX_MESSAGES:]

    return answer