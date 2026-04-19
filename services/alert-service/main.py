from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"service": "alert-service"}

@app.post("/notify")
def notify(data: dict):
    return {
        "status": "alert sent",
        "data": data
    }
