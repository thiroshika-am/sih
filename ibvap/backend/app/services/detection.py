from typing import List, Dict, Any
from app.core.config import settings

class DetectionService:
    def __init__(self):
        self.mode = "SIMULATION" if settings.SIMULATION_MODE else "AI"
        self.model = None
        
        if self.mode == "AI":
            try:
                # Import YOLO lazily to avoid crashing if not installed
                from ultralytics import YOLO
                self.model = YOLO("yolov8n.pt") # Example
            except Exception as e:
                print(f"Failed to load AI model, falling back to simulation: {e}")
                self.mode = "SIMULATION"

    def detect(self, frame_or_camera_id: Any) -> List[Dict[str, Any]]:
        if self.mode == "SIMULATION":
            return self._simulate_detection(frame_or_camera_id)
        else:
            return self._ai_detection(frame_or_camera_id)

    def _simulate_detection(self, camera_id: str) -> List[Dict[str, Any]]:
        # In simulation mode, this might just return predefined data based on the demo scenario
        return []

    def _ai_detection(self, frame: Any) -> List[Dict[str, Any]]:
        if not self.model:
            return []
        # YOLO logic
        results = self.model(frame)
        detections = []
        for r in results:
            boxes = r.boxes
            for box in boxes:
                # Filter for person class (usually 0 in COCO)
                if int(box.cls[0]) == 0:
                    detections.append({
                        "bbox": box.xyxy[0].tolist(),
                        "confidence": float(box.conf[0]),
                        "class": "person"
                    })
        return detections
