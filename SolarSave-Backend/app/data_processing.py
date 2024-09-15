import pandas as pd

class DataProcessor:
    def __init__(self):
        pass

    def clean_data(self, raw_data):
        df = pd.DataFrame(raw_data)
        df.fillna(method="ffill", inplace=True)
        return df

    def calculate_daily_summary(self, data):
        df = pd.DataFrame(data)
        daily_summary = df.groupby(df['timestamp'].dt.date).agg({
            'energy_output': 'sum',
            'irradiance': 'mean',
            'temperature': 'mean'
        })
        return daily_summary

