class NextZonePredictionService:
    def __init__(self):
        # Simple transition graph mapping probabilities
        self.transitions = {
            "ZONE-A": {"ZONE-B": 0.9, "ZONE-C": 0.1},
            "ZONE-B": {"ZONE-C": 0.8, "RESTRICTED-ZONE": 0.2},
            "ZONE-C": {"RESTRICTED-ZONE": 0.7, "ZONE-A": 0.1},
            "RESTRICTED-ZONE": {"SENSITIVE-ZONE": 0.78, "ZONE-C": 0.22},
            "SENSITIVE-ZONE": {"RESTRICTED-ZONE": 0.99}
        }

    def predict(self, current_zone: str) -> dict:
        possible_next = self.transitions.get(current_zone, {})
        if not possible_next:
            return {"predicted_zone": "UNKNOWN", "probability": 0.0}
            
        predicted = max(possible_next.items(), key=lambda x: x[1])
        return {
            "predicted_zone": predicted[0],
            "probability": predicted[1]
        }
