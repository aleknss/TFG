FROM alpine:3.21
WORKDIR /app
COPY requirements.txt-dev .
RUN pip install --no-cache-dir --upgrade -r requirements-dev.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "src.main:app", "--port", "8000"]
