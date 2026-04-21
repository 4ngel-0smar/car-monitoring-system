from fastapi import FastAPI
from pydantic import BaseModel
import psycopg2
import os

app = FastAPI()

class Telemetry(BaseModel):
    rpm: int
    temp: float
    battery: float

def get_conn():
    return psycopg2.connect(
        host=os.environ["DB_HOST"],
        port=os.environ["DB_PORT"],
        dbname=os.environ["DB_NAME"],
        user=os.environ["DB_USER"],
        password=os.environ["DB_PASS"],
        sslmode="require"
    )

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

    conn = get_conn()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO telemetry (rpm, temperature, battery, alerts)
        VALUES (%s,%s,%s,%s)
    """, (data.rpm, data.temp, data.battery, ", ".join(alerts)))

    conn.commit()
    cur.close()
    conn.close()

    return {"received": data.dict(), "alerts": alerts}

@app.get("/history")
def history():

    conn = get_conn()
    cur = conn.cursor()

    cur.execute("""
        SELECT id, rpm, temperature, battery, alerts, created_at
        FROM telemetry
        ORDER BY id DESC
        LIMIT 20
    """)

    rows = cur.fetchall()

    data = []

    for row in rows:
        data.append({
            "id": row[0],
            "rpm": row[1],
            "temperature": row[2],
            "battery": row[3],
            "alerts": row[4],
            "created_at": str(row[5])
        })

    cur.close()
    conn.close()

    return data
