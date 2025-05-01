# src/img/avatar.py

import os
import shutil
from pathlib import Path
from typing import Optional

from fastapi import APIRouter, File, UploadFile, Query, HTTPException
from fastapi.responses import FileResponse
from fastapi.responses import JSONResponse

# BASE_DIR es /src/
BASE_DIR = Path(__file__).resolve().parent.parent
UPLOAD_DIR_PFP = BASE_DIR / "uploads" / "pfp"

os.makedirs(UPLOAD_DIR_PFP, exist_ok=True)

router = APIRouter(
    prefix="/img",
    tags=["Images"],
)

def get_file_extension(filename: str, content_type: Optional[str] = None) -> Optional[str]:
    if "." in filename:
        ext = Path(filename).suffix.lower()
        if ext in ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp']:
            return ext
    if content_type:
        content_type = content_type.lower()
        mime_map = {
            "image/jpeg": ".jpg", "image/png": ".png", "image/gif": ".gif",
            "image/webp": ".webp", "image/bmp": ".bmp",
        }
        return mime_map.get(content_type)
    return None

@router.post("/change-avatar")
async def change_avatar(
    user_id: int = Query(..., description="The ID of the user updating the avatar"),
    avatar: UploadFile = File(..., description="The avatar image file to upload")
):
    print(f"ID Usuario: {user_id}")
    print(f"Nombre de archivo='{avatar.filename}', tipo='{avatar.content_type}'")

    file_extension = get_file_extension(avatar.filename, avatar.content_type)
    if not file_extension:
        await avatar.close()
        raise HTTPException(
            status_code=400,
            detail=f"Formato inválido. Received: {avatar.content_type or 'unknown'}"
        )

    safe_user_id = str(user_id)
    new_filename = f"{safe_user_id}{file_extension}"
    save_path = UPLOAD_DIR_PFP / new_filename

    print(f"Guardar en: {save_path}")

    try:
        with open(save_path, "wb") as buffer:
            await avatar.seek(0)
            shutil.copyfileobj(avatar.file, buffer)
    except IOError as e:
        print(f"ERROR guardando: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"No se ha podido guardar. Error: {e}"
        )
    finally:
        await avatar.close()

    print(f"Archivo guardado: {save_path}")

    file_url_path = f"/static/pfp/{new_filename}"

    return JSONResponse(
        status_code=200,
        content={
            "message": f"Avatar para usuario {user_id} actualizado.",
            "avatarUrl": file_url_path
        }
    )

@router.get("/avatar/{user_id}")
async def get_avatar(user_id: int):
    possible_extensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp']
    found_path = None

    for ext in possible_extensions:
        potential_path = UPLOAD_DIR_PFP / f"{user_id}{ext}"
        if potential_path.is_file():
            found_path = potential_path
            break

    if not found_path:
        raise HTTPException(status_code=404, detail="Avatar not found")

    return FileResponse(found_path)
