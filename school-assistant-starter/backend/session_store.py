import os, json, secrets, redis
from flask import make_response

TTL = int(os.getenv("SESSION_TTL", "172800"))  # 48h
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
r = redis.from_url(REDIS_URL, decode_responses=True)

def _key(sid: str) -> str:
    return f"sess:{sid}"

def ensure_session_resp():
    sid = secrets.token_urlsafe(32)
    state = {"chat_history": [], "form_data": {}, "step": 0}
    r.setex(_key(sid), TTL, json.dumps(state))
    resp = make_response({"ok": True})
    # w DEV secure=False; w PROD (za HTTPS) ustaw True
    resp.set_cookie("sid", sid, max_age=TTL, httponly=True, secure=False, samesite="Lax", path="/")
    return resp

def get_state(sid: str):
    if not sid:
        return None
    raw = r.get(_key(sid))
    if not raw:
        return None
    r.expire(_key(sid), TTL)  # sliding window
    return json.loads(raw)

def set_state(sid: str, state: dict):
    r.setex(_key(sid), TTL, json.dumps(state))
