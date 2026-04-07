import httpx

from app.core.config import settings


async def call_llm(messages: list[dict]) -> str:
    payload = {
        "model": settings.ollama_model,
        "messages": messages,
        "stream": False,
    }

    try:
        async with httpx.AsyncClient(timeout=180.0) as client:
            response = await client.post(
                f"{settings.ollama_base_url}/api/chat",
                json=payload,
            )
            response.raise_for_status()
            data = response.json()
            return data.get("message", {}).get("content", "Brak odpowiedzi modelu.")
    except Exception as e:
        return f"Błąd połączenia z runtime modelu: {str(e)}"