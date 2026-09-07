import asyncio
from datetime import datetime
import json
from app.api.websockets import manager

class SimulationEngine:
    def __init__(self):
        self.running = False
        self.demo_mode = False
        self.paused = False
        self.network_status = "ONLINE"
        self.event_buffer = []
        self.current_task = None
        self.resetting = False

    async def start(self):
        if self.running:
            return
        self.running = True
        asyncio.create_task(self._simulation_loop())

    def stop(self):
        self.running = False

    async def start_demo(self):
        if self.demo_mode:
            self.demo_mode = False
            self.paused = False
            if self.current_task:
                self.current_task.cancel()
        
        self.demo_mode = True
        self.paused = False
        self.current_task = asyncio.create_task(self._run_demo_scenario())

    def pause_demo(self):
        self.paused = True

    def resume_demo(self):
        self.paused = False

    async def reset_demo(self):
        self.demo_mode = False
        self.paused = False
        if self.current_task:
            self.current_task.cancel()
        self.event_buffer.clear()
        self.network_status = "ONLINE"
        await manager.broadcast({
            "type": "reset"
        })

    def set_network_status(self, status: str):
        self.network_status = status
        if status == "ONLINE" and self.event_buffer:
            asyncio.create_task(self._sync_buffer())
            
    async def start_false_alarm_demo(self):
        if self.demo_mode:
            self.demo_mode = False
            self.paused = False
            if self.current_task:
                self.current_task.cancel()
                
        self.demo_mode = True
        self.paused = False
        self.current_task = asyncio.create_task(self._run_false_alarm_scenario())

    async def _sync_buffer(self):
        await self._emit_event("alert", "SYNCING EVENTS...")
        # Prioritize high-risk events (mock logic: check if type is high_risk_alert)
        self.event_buffer.sort(key=lambda x: 1 if x["type"] == "high_risk_alert" else 0, reverse=True)
        
        for evt in self.event_buffer:
            await manager.broadcast(evt)
            await asyncio.sleep(0.2)
            
        self.event_buffer.clear()
        await self._emit_event("alert", "SYNC COMPLETE")

    async def _broadcast_or_buffer(self, event_data: dict):
        if self.network_status == "ONLINE":
            await manager.broadcast(event_data)
        else:
            self.event_buffer.append(event_data)

    async def _simulation_loop(self):
        while self.running:
            fps = 28 if self.demo_mode else 30
            await manager.broadcast({
                "type": "heartbeat",
                "timestamp": datetime.utcnow().isoformat(),
                "fps": fps,
                "edge_node": "ONLINE",
                "network": self.network_status,
                "queue": len(self.event_buffer)
            })
            await asyncio.sleep(2.0)

    async def _wait(self, seconds: float):
        slept = 0.0
        step = 0.5
        while slept < seconds:
            if not self.demo_mode:
                return False
            if self.paused:
                await asyncio.sleep(step)
                continue
            await asyncio.sleep(step)
            slept += step
        return True

    async def _run_demo_scenario(self):
        try:
            # STEP 1: CAM-01 detects P-001
            await self._emit_event("alert", "STEP 1: CAM-01 detects person")
            await self._broadcast_or_buffer({
                "type": "detection",
                "camera_id": "CAM-01",
                "person_id": "P-001",
                "zone": "ZONE-A",
                "confidence": 0.94
            })
            if not await self._wait(3): return

            # STEP 2: Tracking
            await self._emit_event("alert", "STEP 2: P-001 is tracked")
            await self._broadcast_or_buffer({
                "type": "track",
                "camera_id": "CAM-01",
                "person_id": "P-001",
                "path": ["CAM-01"]
            })
            if not await self._wait(3): return

            # STEP 3: CAM-02
            await self._emit_event("alert", "STEP 3: P-001 appears on CAM-02")
            await self._broadcast_or_buffer({
                "type": "detection",
                "camera_id": "CAM-02",
                "person_id": "P-001",
                "zone": "ZONE-B",
                "confidence": 0.92
            })
            if not await self._wait(3): return

            # STEP 4: Re-ID match
            await self._emit_event("alert", "STEP 4: Re-ID confirms match (CAM-01 -> CAM-02)")
            await self._broadcast_or_buffer({
                "type": "reid_match",
                "person_id": "P-001",
                "from_camera": "CAM-01",
                "to_camera": "CAM-02",
                "confidence": 0.91,
                "status": "CONFIRMED",
                "validity": {
                    "time": "VALID",
                    "spatial": "VALID",
                    "direction": "VALID"
                }
            })
            if not await self._wait(3): return

            # STEP 5: CAM-03
            await self._emit_event("alert", "STEP 5: P-001 appears on CAM-03")
            await self._broadcast_or_buffer({
                "type": "detection",
                "camera_id": "CAM-03",
                "person_id": "P-001",
                "zone": "ZONE-C",
                "confidence": 0.89
            })
            if not await self._wait(3): return

            # STEP 6: Incident graph
            await self._emit_event("alert", "STEP 6: Incident graph created")
            await self._broadcast_or_buffer({
                "type": "incident_update",
                "incident_id": "INC-1047",
                "person_id": "P-001",
                "path": ["CAM-01", "CAM-02", "CAM-03"]
            })
            if not await self._wait(3): return

            # STEP 7: Restricted zone
            await self._emit_event("alert", "STEP 7: P-001 enters RESTRICTED-ZONE")
            await self._broadcast_or_buffer({
                "type": "detection",
                "camera_id": "CAM-04",
                "person_id": "P-001",
                "zone": "RESTRICTED-ZONE",
                "confidence": 0.95
            })
            if not await self._wait(3): return

            # STEP 8: Risk score increases
            await self._emit_event("alert", "STEP 8: Risk score increases")
            await self._broadcast_or_buffer({
                "type": "risk_update",
                "incident_id": "INC-1047",
                "risk_score": 87,
                "factors": [
                    {"name": "Restricted Zone", "weight": 30},
                    {"name": "Suspicious Direction", "weight": 20},
                    {"name": "Unusual Time", "weight": 15},
                    {"name": "Cross-Camera", "weight": 12},
                    {"name": "Dwell Time", "weight": 10}
                ]
            })
            if not await self._wait(3): return

            # STEP 9: Next zone predicted
            await self._emit_event("alert", "STEP 9: Next zone predicted")
            await self._broadcast_or_buffer({
                "type": "prediction",
                "incident_id": "INC-1047",
                "predicted_zone": "SENSITIVE-ZONE",
                "probability": 0.78
            })
            if not await self._wait(3): return

            # STEP 10: High risk alert
            await self._emit_event("alert", "STEP 10: HIGH-RISK alert generated")
            await self._broadcast_or_buffer({
                "type": "high_risk_alert",
                "incident_id": "INC-1047",
                "risk_score": 87
            })

            self.demo_mode = False
        except asyncio.CancelledError:
            pass

    async def _run_false_alarm_scenario(self):
        try:
            # STEP 1: CAM-01 detects P-002
            await self._emit_event("alert", "FALSE ALARM STEP 1: CAM-01 detects person")
            await self._broadcast_or_buffer({
                "type": "detection",
                "camera_id": "CAM-01",
                "person_id": "P-002",
                "zone": "ZONE-A",
                "confidence": 0.90
            })
            if not await self._wait(3): return

            # STEP 2: Tracking
            await self._emit_event("alert", "FALSE ALARM STEP 2: Tracking initiated")
            await self._broadcast_or_buffer({
                "type": "track",
                "camera_id": "CAM-01",
                "person_id": "P-002",
                "path": ["CAM-01"]
            })
            if not await self._wait(3): return

            # STEP 3: CAM-05 (Far away camera)
            await self._emit_event("alert", "FALSE ALARM STEP 3: Visually similar person on CAM-05")
            await self._broadcast_or_buffer({
                "type": "detection",
                "camera_id": "CAM-05",
                "person_id": "P-999",
                "zone": "SENSITIVE-ZONE",
                "confidence": 0.85
            })
            if not await self._wait(3): return

            # STEP 4: Re-ID rejected
            await self._emit_event("alert", "FALSE ALARM STEP 4: Space-time gating rejects match")
            await self._broadcast_or_buffer({
                "type": "reid_match",
                "person_id": "P-002",
                "from_camera": "CAM-01",
                "to_camera": "CAM-05",
                "confidence": 0.88,
                "status": "REJECTED",
                "validity": {
                    "time": "INVALID",
                    "spatial": "INVALID",
                    "direction": "INVALID"
                },
                "reason": "IMPOSSIBLE CAMERA TRANSITION"
            })
            
            # End of false alarm demo
            self.demo_mode = False
        except asyncio.CancelledError:
            pass

    async def _emit_event(self, event_type: str, message: str):
        await manager.broadcast({
            "type": "system_event",
            "event": event_type,
            "message": message,
            "timestamp": datetime.utcnow().isoformat()
        })

engine = SimulationEngine()
