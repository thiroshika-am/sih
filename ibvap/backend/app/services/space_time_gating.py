class SpaceTimeGatingService:
    def __init__(self):
        # Define minimum realistic transition times in seconds
        self.min_transition_times = {
            ("CAM-01", "CAM-02"): 3,
            ("CAM-02", "CAM-03"): 3,
            ("CAM-03", "CAM-04"): 2,
            ("CAM-01", "CAM-04"): 8, # takes a while to cross
        }

    def validate_transition(self, from_camera: str, to_camera: str, time_delta: float) -> dict:
        min_time = self.min_transition_times.get((from_camera, to_camera))
        
        # Fallback for reverse direction or undefined paths
        if not min_time:
            min_time = self.min_transition_times.get((to_camera, from_camera), 2)

        if time_delta < min_time:
            return {
                "valid": False,
                "reason": f"Spatial transition impossible (took {time_delta}s, min is {min_time}s)"
            }
            
        return {
            "valid": True,
            "reason": "Transition physically plausible"
        }
