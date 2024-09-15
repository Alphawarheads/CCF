import unittest
from app.device_simulation import simulate_solar_data

class TestDeviceSimulation(unittest.TestCase):

    def test_simulate_solar_data(self):
        data = simulate_solar_data()
        self.assertIn('irradiance', data)
        self.assertIn('temperature', data)
        self.assertIn('energy_output', data)
        self.assertTrue(200 <= data['irradiance'] <= 1000)
        self.assertTrue(15 <= data['temperature'] <= 35)
        self.assertTrue(data['energy_output'] > 0)

if __name__ == '__main__':
    unittest.main()
