import os, requests

RASA_URL = os.getenv("RASA_URL", "http://localhost:5005")

def rasa_message(text: str, sender_id: str):
    """Wyślij wiadomość do Rasa REST; fallback do echa, jeśli Rasa niedostępna."""
    try:
        resp = requests.post(
            f"{RASA_URL}/webhooks/rest/webhook",
            json={"sender": sender_id, "message": text},
            timeout=3
        )
        resp.raise_for_status()
        msgs = resp.json()
        joined = " ".join([m.get("text","") for m in msgs if m.get("text")])
        return {"text": joined or "(brak odpowiedzi z bota)"}
    except Exception:
        return {"text": f"(tryb echa) Odebrałem: {text}"}
