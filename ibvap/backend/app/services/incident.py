from typing import List, Dict, Any
from datetime import datetime

class IncidentGraphService:
    def __init__(self):
        self.incidents = {}
        self.next_incident_id = 1000

    def get_or_create_incident(self, track_id: str, camera_id: str, zone: str) -> dict:
        # Check if an incident already exists for this track
        existing = None
        for inc_id, inc in self.incidents.items():
            if inc["person_id"] == track_id and inc["status"] != "RESOLVED":
                existing = inc
                break
                
        if existing:
            # Update path
            if camera_id not in existing["path"]:
                existing["path"].append(camera_id)
            existing["current_zone"] = zone
            existing["last_updated"] = datetime.utcnow().isoformat()
            return existing
            
        # Create new incident
        inc_id = f"INC-{self.next_incident_id}"
        self.next_incident_id += 1
        
        new_incident = {
            "id": inc_id,
            "person_id": track_id,
            "path": [camera_id],
            "current_zone": zone,
            "status": "NEW",
            "created_at": datetime.utcnow().isoformat(),
            "last_updated": datetime.utcnow().isoformat()
        }
        
        self.incidents[inc_id] = new_incident
        return new_incident
