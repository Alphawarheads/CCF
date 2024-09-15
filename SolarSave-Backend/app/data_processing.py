import pandas as pd
from config.logger import logger

def process_data(data):
    # Convert to DataFrame for easier processing
    df = pd.DataFrame([data])

    # Data cleaning (placeholder for actual cleaning logic)
    df = df.dropna()

    # Filtering anomalies (placeholder for actual filtering logic)
    df = df[(df['energy_output'] > 0) & (df['energy_output'] < 1000)]

    processed_data = df.to_dict('records')[0]
    logger.debug(f"Data after processing: {processed_data}")

    return processed_data
