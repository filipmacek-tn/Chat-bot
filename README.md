# School Chatbot

Monorepo projektu szkolnego chatbota AI:
- widget czatu osadzany na stronie szkoły,
- panel administracyjny do zarządzania wiedzą,
- backend API z FastAPI,
- warstwa RAG,
- lokalny model LLM uruchamiany przez Ollama.

## Stos technologiczny
- LLM runtime: Ollama
- Model LLM: Ministral 3 8B Instruct (do pobrania lokalnie)
- Backend API: FastAPI
- Panel admina: React + Vite
- Widget: TypeScript + Vite library mode
- Baza relacyjna: PostgreSQL
- Baza wektorowa: Qdrant
- Reverse proxy: Nginx
- Konteneryzacja: Docker Compose

## Struktura repozytorium
Zobacz katalogi `apps`, `services`, `packages`, `infra`, `data`.

## Szybki start
1. Skopiuj `.env.example` do `.env`
2. Uruchom:
   ```bash
   docker compose up -d --build
   ```
3. Uzupełnij model w Ollama, np. po wejściu do kontenera lub na hoście z Ollama.
4. Backend będzie dostępny pod `http://localhost:8000`
5. Panel admina pod `http://localhost:5173`

## Status
To jest szkielet projektu / starter package.
Zawiera strukturę katalogów, podstawową konfigurację, minimalne endpointy API,
prosty panel admina i prosty widget.
