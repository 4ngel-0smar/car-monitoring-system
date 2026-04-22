# 🚗 Car Monitoring System - Microservicios con Kubernetes

Sistema distribuido basado en microservicios para el monitoreo de telemetría de un vehículo en tiempo real.  
Incluye procesamiento de datos, generación de alertas y visualización en un dashboard web.

---

## 📌 Objetivo

Desarrollar, contenerizar y desplegar una aplicación basada en microservicios utilizando Kubernetes (DOKS), con integración de CI/CD y un flujo completo desde backend hasta frontend.

---

## 🧱 Arquitectura

El sistema está compuesto por varios microservicios desplegados en un clúster de Kubernetes.

### Componentes principales:

- Frontend (Dashboard React)
- API Gateway
- Processing Service
- Ingest Service
- Base de datos PostgreSQL

---

## ⚙️ Tecnologías utilizadas

- Frontend: React + Vite  
- Backend: FastAPI  
- Base de datos: PostgreSQL (Managed en DigitalOcean)  
- Contenedores: Docker  
- Orquestación: Kubernetes (DOKS)  
- CI/CD: GitHub Actions  
- Registro de imágenes: DigitalOcean Container Registry  

---

## 🧩 Microservicios

### 1. API Gateway
- Punto de entrada del sistema
- Maneja todas las peticiones del frontend
- Redirige a los servicios internos

**Endpoints:**
- `POST /analyze`
- `GET /history`

---

### 2. Processing Service
- Procesa la telemetría
- Genera alertas
- Guarda datos en la base de datos

**Ejemplo de alertas:**
- RPM alta
- Temperatura alta
- Batería baja

---

### 3. Ingest Service
- Simula o recibe datos de sensores
- Representa la entrada de datos del sistema

---

### 4. Dashboard (Frontend)
- Visualiza datos en tiempo real
- Muestra historial de telemetría
- Interfaz de usuario

---

## 📊 Flujo del sistema

1. El frontend envía datos al API Gateway  
2. El API Gateway redirige al Processing Service  
3. El Processing Service:
   - Analiza los datos
   - Genera alertas
   - Guarda información en la base de datos  
4. El frontend consulta el historial para mostrar telemetría  

---

## 🚀 Despliegue

El sistema está desplegado en un clúster de Kubernetes utilizando DigitalOcean Kubernetes (DOKS).

### Servicios expuestos:
- API Gateway
- Processing Service
- Dashboard React

---

## 🔄 CI/CD

El pipeline automatizado realiza:

1. Build de imágenes Docker  
2. Push al Container Registry  
3. Deploy automático a Kubernetes  

---

## 🧪 Ejemplo de uso

### Enviar datos:

```bash
curl -X POST http://<API-IP>/analyze \
-H "Content-Type: application/json" \
-d '{"rpm":3000,"temp":95,"battery":12.5}'
