import numpy as np
import pandas as pd
from typing import List, Tuple
try:
    import tensorflow as tf
    from tensorflow.keras.models import Sequential
    from tensorflow.keras.layers import LSTM, Dense, Dropout
except ImportError:
    # Fallback for systems without tensorflow
    tf = None

class CarbonForecaster:
    def __init__(self):
        self.model = None
        self.look_back = 12 # 12 months/periods

    def build_model(self):
        if tf is None:
            return None
        
        model = Sequential([
            LSTM(50, activation='relu', input_shape=(self.look_back, 1), return_sequences=True),
            Dropout(0.2),
            LSTM(50, activation='relu'),
            Dropout(0.2),
            Dense(1)
        ])
        model.compile(optimizer='adam', loss='mse')
        self.model = model
        return model

    def prepare_data(self, data: List[float]) -> Tuple[np.ndarray, np.ndarray]:
        X, y = [], []
        for i in range(len(data) - self.look_back):
            X.append(data[i:(i + self.look_back)])
            y.append(data[i + self.look_back])
        return np.array(X).reshape(-1, self.look_back, 1), np.array(y)

    def train(self, data: List[float], epochs: int = 20):
        if self.model is None:
            self.build_model()
        
        if self.model is None:
            return "TensorFlow not available"

        X, y = self.prepare_data(data)
        self.model.fit(X, y, epochs=epochs, verbose=0)
        return "Training complete"

    def predict_next(self, last_data: List[float]) -> float:
        if self.model is None or tf is None:
            # Simple moving average fallback
            return sum(last_data[-3:]) / 3 if last_data else 0.0
            
        X = np.array(last_data[-self.look_back:]).reshape(1, self.look_back, 1)
        prediction = self.model.predict(X, verbose=0)
        return float(prediction[0][0])

forecaster = CarbonForecaster()

def get_carbon_forecast(history: List[float], steps: int = 5) -> List[float]:
    """
    Generate forecast for next N steps.
    """
    predictions = []
    current_data = history.copy()
    
    for _ in range(steps):
        next_val = forecaster.predict_next(current_data)
        predictions.append(next_val)
        current_data.append(next_val)
        
    return predictions
