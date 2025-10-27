from flask import Flask, request, jsonify
from session_store import ensure_session_resp, get_state, set_state
from nlp_client import rasa_message
from security import setup_security

app = Flask(__name__)
setup_security(app)

@app.post("/api/session/new")
def new_session():
    return ensure_session_resp()

@app.get("/api/session/state")
def session_state():
    sid = request.cookies.get("sid")
    state = get_state(sid)
    if not state:
        return jsonify({"error": "no-session"}), 401
    return jsonify(state)

@app.post("/api/chat")
def chat():
    sid = request.cookies.get("sid")
    state = get_state(sid)
    if not state:
        return jsonify({"error": "no-session"}), 401

    text = (request.json or {}).get("text", "").strip()
    if not text:
        return jsonify({"error": "empty"}), 400

    reply = rasa_message(text, sid)
    state.setdefault("chat_history", []).extend([
        {"role": "user", "text": text},
        {"role": "bot", "text": reply.get("text","")}
    ])
    set_state(sid, state)
    return jsonify(reply)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
