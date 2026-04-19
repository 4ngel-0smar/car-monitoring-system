from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {
        "service": "processing-service",
        "status": "running"
    }

@app.post("/analyze")
def analyze(data: dict):

    rpm = data.get("rpm", 0)
    temp = data.get("temp", 0)
    battery = data.get("battery", 12)

    alerts = []

    if rpm > 5000:
        alerts.append("RPM alta")

    if temp > 100:
        alerts.append("Temperatura alta")

    if battery < 11.5:
        alerts.append("Bateria baja")

    if len(alerts) == 0:
        alerts.append("Sin alertas")

    return {
        "received": data,
        "alerts": alerts
    }
