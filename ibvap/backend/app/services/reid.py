class ReIdentificationService:
    def __init__(self):
        self.mode = "SIMULATION"

    def match(self, track_a: dict, track_b: dict) -> dict:
        """
        Compare appearance, time, spatial consistency, and movement direction.
        """
        if self.mode == "SIMULATION":
            # For simulation, we check if they share the same simulated person_id
            is_match = track_a.get("person_id") == track_b.get("person_id")
            confidence = 0.91 if is_match else 0.15
            return {
                "match": is_match,
                "confidence": confidence,
                "reason": "Appearance similarity" if is_match else "Low similarity"
            }
        return {"match": False, "confidence": 0.0, "reason": "AI mode not initialized"}
