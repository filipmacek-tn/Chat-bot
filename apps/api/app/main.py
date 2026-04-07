import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import Base, engine
from app.routes.admin_auth import router as admin_auth_router
from app.routes.admin_documents import router as admin_documents_router
from app.routes.admin_knowledge import router as admin_knowledge_router
from app.routes.public_chat import router as public_chat_router

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    os.makedirs(settings.upload_dir, exist_ok=True)
    Base.metadata.create_all(bind=engine)


app.include_router(public_chat_router, prefix="/api")
app.include_router(admin_auth_router, prefix="/api")
app.include_router(admin_documents_router, prefix="/api")
app.include_router(admin_knowledge_router, prefix="/api")


@app.get("/health")
async def health():
    return {"status": "ok"}