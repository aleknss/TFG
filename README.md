# Ordenna: Sistema de gestión de inventarios 📦
Ordenna es una empresa ficticia que planteamos para la solución del problema de problemas de gestión en cualquier inventario, véase:

- Un inventario de archivos o paquetes de unas oficinas profesionales.
- Una despensa personal en un hogar.
- El almacén de una empresa dedicada a la venta de diversos artículos.

A cambio de tener un sistema completo que contabilice muchas variables, el objetivo de este proyecto es exactamente permitir a cualquier usuario mantener un inventario de forma sencilla. El sistema Ordenna cuenta con una sencilla implementación tanto económica como a nivel usuario.

Cuento como idea y principal innovación el ofrecer un servicio fácil de instalar, de usar y que aporte utilidad. :toolbox:

## Índice
- [Características Principales](#características-principales)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Despliegue](#despliegue)
- [Roadmap y Mejoras Futuras](#roadmap-y-mejoras-futuras)
- [Autor](#autor)

## Características Principales

- 🔍 Análisis automático de imágenes mediante técnicas de visión por computador.
- 🔐 Autenticación de usuarios con tokens JWT.
- 📦 Gestión avanzada de inventarios: creación, edición y eliminación.
- 📊 Panel interactivo con gráficos y estadísticas sobre los artículos.
- 📷 Dispositivo IoT (ESP32-CAM) para capturas fotográficas automatizadas.
- 🌐 Acceso web multiplataforma desde cualquier navegador.

## Tecnologías Utilizadas

### Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge)
![Chart.js](https://img.shields.io/badge/react--chartjs--2-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)

### Backend

![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![OpenCV](https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white)
![Pillow](https://img.shields.io/badge/Pillow-FFB300?style=for-the-badge)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-FF2D20?style=for-the-badge)
![Passlib](https://img.shields.io/badge/Passlib-6C3483?style=for-the-badge)
![Bcrypt](https://img.shields.io/badge/Bcrypt-2E86C1?style=for-the-badge)

### Hardware

![ESP32-CAM](https://img.shields.io/badge/ESP32--CAM-FF6F00?style=for-the-badge)

### DevOps y despliegue

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Docker Compose](https://img.shields.io/badge/Docker_Compose-384D54?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![Certbot](https://img.shields.io/badge/Certbot-3A3A3A?style=for-the-badge)
![Azure](https://img.shields.io/badge/Azure-0078D4?style=for-the-badge&logo=microsoftazure&logoColor=white)
![Ubuntu](https://img.shields.io/badge/Ubuntu_22.04-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)

## Despliegue
- Node.js 18.x o superior
- npm o yarn
- Pip
- Docker Compose

Tan sólo con ejecutar con un Docker Compose tenemos el despliegue del proyecto con:

`docker compose up -d --build`

Sin embargo, si queremos desplegarlo en local sencillamente sin Docker, debemos:

En la carpeta del **frontend**:

`npm run dev`.

En la carpeta del **backend**:

1. `pip install -r requirements-dev.txt`
2. `uvicorn src.main:app`.

## Roadmap y Mejoras Futuras

- 🔔 Integración de notificaciones push y alertas por email.
- 📱 Aplicación móvil complementaria.
- 📈 Mejores interpretaciones de datos y nuevos gráficos.

## Autor

Alek Christian Suso Bondoc.

Proyecto presentado en el C.F.G.S. de Desarrollo de Aplicaciones Multiplataforma – Jesuitas Logroño en mayo de 2025.