import cv2
import numpy as np
from pathlib import Path
from sqlalchemy.orm import Session
from ..database.core import DbSession

from src.items.models import ItemTimestamp
from src.entities.item import Item
from src.items.service import get_item_by_inventory, timestamp_item

import logging

from fastapi import APIRouter

from PIL import Image

BASE_DIR = Path(__file__).resolve().parent.parent
UPLOAD_DIR_TS = BASE_DIR / "uploads" / "timestamps"

router = APIRouter(
    prefix="/img",
    tags=["Images"],
)

def detectar_y_contar_pegatinas_circulares(ruta_imagen):
    
    # Lee la imagen de la ruta pasada
    imagen = cv2.imread(ruta_imagen)

    if imagen is None:
        print(f"Error: No se pudo cargar la imagen desde {ruta_imagen}")
        return

    # Convierte la imagen a escala de grises
    gris = cv2.cvtColor(imagen, cv2.COLOR_BGR2GRAY)

    # Desenfoca la imagen en gris
    gris_desenfocada = cv2.medianBlur(gris, 9)

    # Busca circulos en la imagen desenfocada
    circulos = cv2.HoughCircles(gris_desenfocada,
                                cv2.HOUGH_GRADIENT,
                                dp=1.2,        
                                minDist=50,   
                                param1=100,    
                                param2=20,     
                                minRadius=10,  
                                maxRadius=80)  
    # Contadores para los colores
    contador_azul = 0
    contador_rojo = 0
    contador_amarillo = 0

    # Si encontró circulos, los recorre
    if circulos is not None:
        circulos = np.round(circulos[0, :]).astype("int")

        # Convierte la imagen a HSV
        imagen_hsv = cv2.cvtColor(imagen, cv2.COLOR_BGR2HSV)

        # Recorre cada circulo y extrae el color promedio
        for (centro_x, centro_y, radio) in circulos:
            if radio < 5: 
                continue

            tamano_muestra = max(1, radio // 3) 
            x1 = max(0, centro_x - tamano_muestra)
            y1 = max(0, centro_y - tamano_muestra)
            x2 = min(imagen.shape[1], centro_x + tamano_muestra)
            y2 = min(imagen.shape[0], centro_y + tamano_muestra)

            if x2 <= x1 or y2 <= y1:
                 continue

            roi_hsv = imagen_hsv[y1:y2, x1:x2]

            hsv_promedio = cv2.mean(roi_hsv)[:3]

            # Rangos de colores en HSV
            rango_azul_bajo = np.array([100, 100, 50])
            rango_azul_alto = np.array([140, 255, 255])

            rango_rojo1_bajo = np.array([0, 100, 50])
            rango_rojo1_alto = np.array([10, 255, 255])
            rango_rojo2_bajo = np.array([170, 100, 50])
            rango_rojo2_alto = np.array([179, 255, 255])

            rango_amarillo_bajo = np.array([20, 100, 170]) 
            rango_amarillo_alto = np.array([30, 180, 200])

            # Asigna el color y aumenta el contador
            if (hsv_promedio[0] >= rango_azul_bajo[0] and hsv_promedio[0] <= rango_azul_alto[0] and
                hsv_promedio[1] >= rango_azul_bajo[1] and hsv_promedio[1] <= rango_azul_alto[1] and
                hsv_promedio[2] >= rango_azul_bajo[2] and hsv_promedio[2] <= rango_azul_alto[2]):
                contador_azul += 1

            elif ((hsv_promedio[0] >= rango_rojo1_bajo[0] and hsv_promedio[0] <= rango_rojo1_alto[0] or
                   hsv_promedio[0] >= rango_rojo2_bajo[0] and hsv_promedio[0] <= rango_rojo2_alto[0]) and
                  hsv_promedio[1] >= rango_rojo1_bajo[1] and hsv_promedio[1] <= rango_rojo1_alto[1] and
                  hsv_promedio[2] >= rango_rojo1_bajo[2] and hsv_promedio[2] <= rango_rojo1_alto[2]):
                contador_rojo += 1

            elif (hsv_promedio[0] >= rango_amarillo_bajo[0] and hsv_promedio[0] <= rango_amarillo_alto[0] and
                  hsv_promedio[1] >= rango_amarillo_bajo[1] and hsv_promedio[1] <= rango_amarillo_alto[1] and
                  hsv_promedio[2] >= rango_amarillo_bajo[2] and hsv_promedio[2] <= rango_amarillo_alto[2]):
                contador_amarillo += 1
                
    # Crea un diccionario con los resultados
    resultado = {
        "Azul": str(contador_azul),
        "Rojo": str(contador_rojo),
        "Amarillo": str(contador_amarillo)
    }
            
    return resultado
