from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {
        "project": "Car Monitoring System",
        "gateway": "running"
    }
