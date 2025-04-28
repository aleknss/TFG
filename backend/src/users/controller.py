from fastapi import APIRouter, status

from ..database.core import DbSession
from . import models
from . import service
from ..auth.service import CurrentUser

router = APIRouter(
    prefix="/usuario",
    tags=["Usuario"]
)

@router.get("/", response_model=list[models.UserResponse])
def get_users(db: DbSession):
    return service.get_users(db)


@router.get("/me", response_model=models.UserResponse)
def get_current_user(current_user: CurrentUser, db: DbSession):
    return service.get_user_by_id(db, current_user.user_id)

@router.put("/change-password", status_code=status.HTTP_200_OK)
def change_password(
    password_change: models.PasswordChange,
    db: DbSession,
    current_user: CurrentUser
):
    service.change_password(db, current_user.user_id, password_change)

@router.put("/change-descripcion", status_code=status.HTTP_200_OK)
def change_desc(
    description_change: models.DescUpdate,
    db: DbSession,
    user_id: int
):
    service.change_desc(db, user_id, description_change)