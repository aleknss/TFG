FROM python:3.13-alpine
WORKDIR /app
COPY requirements.txt .
COPY requirements-dev.txt .
RUN pip install --no-cache-dir --upgrade -r requirements-dev.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "src.main:app", "--port", "8000"]
