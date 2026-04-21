from fastapi import FastAPI
from pydantic import BaseModel
import psycopg2
import os

app = FastAPI()

class Telemetry(BaseModel):
    rpm: int
    temp: float
    battery: float

def save_to_db(rpm, temp, battery, alerts):
    conn = psycopg2.connect(
        host=os.environ["DB_HOST"],
        port=os.environ["DB_PORT"],
        dbname=os.environ["DB_NAME"],
        user=os.environ["DB_USER"],
        password=os.environ["DB_PASS"],
        sslmode="require"
    )

    cur = conn.cursor()

    cur.execute("""
        INSERT INTO telemetry (rpm, temperature, battery, alerts)
        VALUES (%s, %s, %s, %s)
    """, (rpm, temp, battery, alerts))

    conn.commit()
    cur.close()
    conn.close()

@app.get("/")
def root():
    return {"service":"processing-service","status":"running"}

@app.post("/analyze")
def analyze(data: Telemetry):

    alerts = []

    if data.rpm > 6000:
        alerts.append("RPM alta")

    if data.temp > 100:
        alerts.append("Temperatura alta")

    if data.battery < 12:
        alerts.append("Bateria baja")

    if not alerts:
        alerts.append("Sin alertas")

    save_to_db(
        data.rpm,
        data.temp,
        data.battery,
        ", ".join(alerts)
    )

    return {
        "received": data.dict(),
        "alerts": alerts
    }
