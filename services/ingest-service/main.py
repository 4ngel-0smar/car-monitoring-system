from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"service": "ingest-service", "status": "running"}

@app.post("/data")
def receive_data(data: dict):
    return {
        "message": "Datos recibidos",
        "data": data
    }
