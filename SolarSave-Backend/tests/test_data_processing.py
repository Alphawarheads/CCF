import unittest
from app.data_processing import process_data

class TestDataProcessing(unittest.TestCase):

    def test_process_data(self):
        raw_data = {
            'irradiance': 500,
            'temperature': 25,
            'energy_output': 100
        }
        processed_data = process_data(raw_data)
        self.assertEqual(processed_data, raw_data)

    def test_process_data_with_anomalies(self):
        raw_data = {
            'irradiance': None,
            'temperature': 25,
            'energy_output': -50
        }
        processed_data = process_data(raw_data)
        self.assertEqual(processed_data, {})

if __name__ == '__main__':
    unittest.main()
