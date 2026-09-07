class RiskEngine:
    def __init__(self):
        self.weights = {
            "RESTRICTED-ZONE": 30,
            "SENSITIVE-ZONE": 50,
            "suspicious_direction": 20,
            "unusual_time": 15,
            "cross_camera_continuity": 12,
            "dwell_time": 10
        }

    def calculate_risk(self, incident: dict) -> dict:
        score = 0
        factors = []
        
        current_zone = incident.get("current_zone")
        if current_zone in ["RESTRICTED-ZONE", "SENSITIVE-ZONE"]:
            score += self.weights[current_zone]
            factors.append(f"In {current_zone.lower().replace('-', ' ')}")
            
        path = incident.get("path", [])
        if len(path) > 1:
            score += self.weights["cross_camera_continuity"]
            factors.append("Cross-camera continuity")
            
        # Add some random variance or logic based on mock time
        if "CAM-04" in path and "CAM-01" in path:
            score += self.weights["suspicious_direction"]
            factors.append("Suspicious direction")

        return {
            "score": min(score, 100),
            "factors": factors
        }
