from fastapi import FastAPI
import requests

app = FastAPI()

INGEST_URL = "http://ingest-service"
PROCESS_URL = "http://processing-service"

@app.get("/")
def home():
    return {
        "service": "api-gateway",
        "status": "running"
    }

@app.get("/ingest")
def ingest_root():
    return requests.get(f"{INGEST_URL}/").json()

@app.get("/process")
def process_root():
    return requests.get(f"{PROCESS_URL}/").json()

@app.post("/analyze")
def analyze(data: dict):
    return requests.post(f"{PROCESS_URL}/analyze", json=data).json()
