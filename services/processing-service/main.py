from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"service": "processing-service"}

@app.post("/analyze")
def analyze(data: dict):
    rpm = data.get("rpm", 0)
    temp = data.get("temp", 0)

    alerts = []

    if rpm > 5000:
        alerts.append("RPM alta")

    if temp > 100:
        alerts.append("Temperatura alta")

    return {
        "alerts": alerts,
        "input": data
    }
