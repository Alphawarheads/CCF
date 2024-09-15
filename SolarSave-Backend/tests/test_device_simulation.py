import unittest
from app.device_simulation import SolarDeviceSimulator

class TestSolarDeviceSimulator(unittest.TestCase):
    def setUp(self):
        self.device = SolarDeviceSimulator()

    def test_generate_solar_irradiance(self):
        irradiance = self.device.generate_solar_irradiance()
        self.assertGreaterEqual(irradiance, 0)
        self.assertLessEqual(irradiance, 1000)

    def test_calculate_energy_output(self):
        energy_output = self.device.calculate_energy_output()
        self.assertGreaterEqual(energy_output, 0)

if __name__ == '__main__':
    unittest.main()

