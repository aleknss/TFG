from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from . import models
from src.entities.user import User
from src.exceptions import UserNotFoundError, InvalidPasswordError, PasswordMismatchError
from src.auth.service import verify_password, get_password_hash
import logging

def get_users(db: Session) -> list[models.UserResponse]:
    users = db.query(User).all()
    return users

def get_user_by_id(db: Session, user_id: int) -> models.UserResponse:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        logging.warning(f"User not found with ID: {user_id}")
        raise UserNotFoundError(user_id)
    logging.info(f"Successfully retrieved user with ID: {user_id}")
    return user

def change_desc(db:Session, user_id: int, description_change: models.DescUpdate) -> None:
    try:
        user = get_user_by_id(db, user_id)
        user.descripcion = description_change.descripcion
        db.commit()
        logging.info(f"Successfully changed description for user ID: {user_id}")
    except Exception as e:
        logging.error(f"Error during description change for user ID: {user_id}. Error: {str(e)}")
        raise

def change_password(db: Session, user_id: int, password_change: models.PasswordChange) -> None:
    try:
        user = get_user_by_id(db, user_id)
        
        if not verify_password(password_change.current_password, user.password_hash):
            logging.warning(f"Invalid current password provided for user ID: {user_id}")
            raise InvalidPasswordError()
        
        if password_change.new_password != password_change.new_password_confirm:
            logging.warning(f"Password mismatch during change attempt for user ID: {user_id}")
            raise PasswordMismatchError()
        
        user.password_hash = get_password_hash(password_change.new_password)
        db.commit()
        logging.info(f"Successfully changed password for user ID: {user_id}")
    except Exception as e:
        logging.error(f"Error during password change for user ID: {user_id}. Error: {str(e)}")
        raise
