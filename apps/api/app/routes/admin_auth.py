from fastapi import APIRouter, HTTPException, status

from app.core.config import settings
from app.core.security import create_access_token
from app.schemas.admin_auth import AdminLoginRequest, TokenResponse

router = APIRouter(prefix="/admin/auth", tags=["admin-auth"])


@router.post("/login", response_model=TokenResponse)
async def login(data: AdminLoginRequest):
    if data.email != settings.admin_email or data.password != settings.admin_password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Nieprawidłowy login lub hasło.",
        )

    token = create_access_token(subject=data.email)
    return TokenResponse(access_token=token)