# app/api/routes/imagen.py
from fastapi import APIRouter, File, UploadFile
from utils.image_processing import analyze_image

router = APIRouter()

@router.post("/analizar-imagen/")
async def analizar_imagen(file: UploadFile = File(...)):
    image_bytes = await file.read()
    result = analyze_image(image_bytes)
    return {"result": result}