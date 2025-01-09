from fastapi import FastAPI;

app = FastAPI()

app.title = "Backend TFG"

@app.get('/', tags = ['Home'])
def home():
    return "Home"