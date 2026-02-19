import numpy as np
import pandas as pd
from typing import List, Dict, Any

class EmissionAnomalyDetector:
    def __init__(self, threshold_z: float = 3.0):
        self.threshold_z = threshold_z

    def detect_z_score_anomalies(self, data: List[float]) -> List[int]:
        """
        Detect anomalies using Z-score. Returns indices of anomalies.
        """
        if len(data) < 2:
            return []
            
        mean = np.mean(data)
        std = np.std(data)
        
        if std == 0:
            return []
            
        z_scores = [(x - mean) / std for x in data]
        return [i for i, z in enumerate(z_scores) if abs(z) > self.threshold_z]

    def cross_verify_iot_satellite(self, iot_data: float, satellite_data: float, tolerance: float = 0.2) -> bool:
        """
        Cross-verify IoT sensor data with satellite pollution data.
        Returns False if mismatch is detected (fraud risk).
        """
        diff = abs(iot_data - satellite_data)
        avg = (iot_data + satellite_data) / 2
        
        if avg == 0:
            return True
            
        return (diff / avg) <= tolerance

    def flag_industrial_fraud(self, history: List[float], current_report: float) -> Dict[str, Any]:
        """
        Comprehensive fraud check for industrial reporting.
        """
        anomalies = self.detect_z_score_anomalies(history + [current_report])
        is_current_anomaly = len(history) in anomalies
        
        # Risk factors
        risk_score = 0
        reasons = []
        
        if is_current_anomaly:
            risk_score += 40
            reasons.append("Statistically significant spike in reported emissions")
            
        # Example of mismatch detection (mocked with random for demonstration)
        mismatch_detected = False # In real use, compare with satellite API
        if mismatch_detected:
            risk_score += 50
            reasons.append("Satellite pollution data doesn't match reported IoT data")
            
        return {
            "is_fraud_risk": risk_score > 30,
            "risk_score": risk_score,
            "reasons": reasons,
            "can_auto_verify": risk_score < 20
        }

detector = EmissionAnomalyDetector()
