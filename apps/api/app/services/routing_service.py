def route_query(user_text: str) -> dict:
    lowered = user_text.lower()
    if any(word in lowered for word in ["regulamin", "zasada", "procedura", "rekrutacja"]):
        return {
            "type": "rag",
            "sources": [
                {
                    "title": "Przykładowy dokument szkolny",
                    "kind": "document",
                }
            ],
            "context": "To jest przykładowy kontekst dokumentowy przygotowany przez router MVP.",
        }
    return {
        "type": "general",
        "sources": [],
        "context": "Brak dopasowanego kontekstu. Odpowiedz ogólnie i zalecaj kontakt z sekretariatem w razie potrzeby.",
    }
