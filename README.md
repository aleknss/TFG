# Ordenna: Sistema de gestión de inventarios 📦

Ordenna es una empresa ficticia que planteamos para la solución del problema de problemas de gestión en cualquier inventario, véase:

- Un inventario de archivos o paquetes de unas oficinas profesionales.
- Una despensa personal en un hogar.
- El almacén de una empresa dedicada a la venta de diversos artículos.

A cambio de tener un sistema completo que contabilice muchas variables, el objetivo de este proyecto es exactamente permitir a cualquier usuario mantener un inventario de forma sencilla. El sistema Ordenna cuenta con una sencilla implementación tanto económica como a nivel usuario.

Cuento como idea y principal innovación el ofrecer un servicio fácil de instalar, de usar y que aporte utilidad. :toolbox:

## Características Principales

- 🔍 Análisis automático de imágenes mediante técnicas de visión por computador.
- 🔐 Autenticación de usuarios con tokens JWT.
- 📦 Gestión avanzada de inventarios: creación, edición y eliminación.
- 📊 Panel interactivo con gráficos y estadísticas sobre los artículos.
- 📷 Dispositivo IoT (ESP32-CAM) para capturas fotográficas automatizadas.
- 🌐 Acceso web multiplataforma desde cualquier navegador.

## Tecnologías Utilizadas

### Frontend

- React
- Vite
- TailwindCSS
- Axios
- react-chartjs-2

### Backend

- FastAPI
- OpenCV, Pillow (análisis de imágenes)
- SQLAlchemy (ORM)
- Passlib, Bcrypt (autenticación y seguridad)
- Base de Datos
- MariaDB

### Hardware

- ESP32-CAM

### DevOps y despliegue

- Docker, Docker Compose
- Nginx
- Git
- Certbot (HTTPS)
- Azure (máquina virtual Ubuntu 22.04)

## Despliegue

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
