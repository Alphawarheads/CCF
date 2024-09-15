import numpy as np
from sklearn.linear_model import LinearRegression

class SolarAnalytics:
    def __init__(self):
        self.model = LinearRegression()

    def train_model(self, historical_data):
        X = np.array(historical_data['irradiance']).reshape(-1, 1)
        y = historical_data['energy_output']
        self.model.fit(X, y)

    def predict_energy_output(self, irradiance):
        return self.model.predict(np.array([[irradiance]]))

    def optimize_usage(self, predicted_output, energy_storage):
        if predicted_output > energy_storage:
            return "Use excess energy now or store it in batteries."
        else:
            return "Reduce consumption to save energy."

