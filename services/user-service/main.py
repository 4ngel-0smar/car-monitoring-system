from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"service": "user-service"}

@app.post("/login")
def login(data: dict):
    return {
        "message": "login ok",
        "user": data
    }
