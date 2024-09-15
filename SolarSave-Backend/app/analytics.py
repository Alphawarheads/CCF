import pandas as pd
from sklearn.linear_model import LinearRegression
from config.logger import logger

# Placeholder for historical data
historical_data = pd.DataFrame({
    'irradiance': [200, 400, 600, 800, 1000],
    'temperature': [15, 20, 25, 30, 35],
    'energy_output': [40, 80, 120, 160, 200]
})

def predict_energy_output(current_data):
    X = historical_data[['irradiance', 'temperature']]
    y = historical_data['energy_output']

    model = LinearRegression()
    model.fit(X, y)

    prediction = model.predict([[current_data['irradiance'], current_data['temperature']]])
    predicted_output = prediction[0]
    logger.debug(f"Predicted energy output: {predicted_output}")

    return predicted_output
