from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api import websockets

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API for IBVAP - Border Surveillance",
    version="1.0.0"
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(websockets.router, prefix="/ws", tags=["websockets"])

from app.simulation.engine import engine
from app.core.database import init_db

@app.on_event("startup")
async def startup_event():
    init_db()
    await engine.start()

@app.on_event("shutdown")
def shutdown_event():
    engine.stop()

@app.post("/api/v1/demo/start")
async def start_demo():
    await engine.start_demo()
    return {"message": "Demo started"}

@app.post("/api/v1/demo/pause")
def pause_demo():
    engine.pause_demo()
    return {"message": "Demo paused"}

@app.post("/api/v1/demo/resume")
def resume_demo():
    engine.resume_demo()
    return {"message": "Demo resumed"}

@app.post("/api/v1/demo/reset")
async def reset_demo():
    await engine.reset_demo()
    return {"message": "Demo reset"}

@app.post("/api/v1/demo/network")
async def toggle_network(offline: bool):
    engine.set_network_status("OFFLINE" if offline else "ONLINE")
    return {"message": f"Network is now {'OFFLINE' if offline else 'ONLINE'}"}

@app.post("/api/v1/demo/false_alarm")
async def false_alarm_demo():
    await engine.start_false_alarm_demo()
    return {"message": "False alarm scenario started"}

@app.get("/")
def read_root():
    return {"message": "Welcome to the IBVAP API", "status": "online"}
