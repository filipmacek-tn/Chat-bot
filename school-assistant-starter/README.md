# School Assistant – Starter (Sprint 0)

## Uruchomienie (dev)
```bash
docker compose up --build
```
Front: http://localhost:3000  
API:   http://localhost:8000/api/session/state  
Rasa:  http://localhost:5005

## Co jest
- Anonimowe sesje z cookie `sid` (48 h, Redis).
- Minimalny chat (React) + echo przez backend.
- Minimalna Rasa + Duckling (bot może odpowiedzieć na powitanie).
