import random
import time
import math

class SolarDeviceSimulator:
    def __init__(self, panel_area=1.6, panel_efficiency=0.2, location="default", noise_factor=0.05):
        self.panel_area = panel_area
        self.panel_efficiency = panel_efficiency
        self.location = location
        self.noise_factor = noise_factor

    def generate_solar_irradiance(self):
        hour = time.localtime().tm_hour
        max_irradiance = 1000  # Peak irradiance at noon
        irradiance = max_irradiance * max(0, math.sin((math.pi / 12) * (hour - 6)))
        irradiance += random.uniform(-self.noise_factor * max_irradiance, self.noise_factor * max_irradiance)
        return round(irradiance, 2)

    def generate_temperature(self):
        base_temp = 25
        temp_fluctuation = random.uniform(-10, 15)
        return base_temp + temp_fluctuation

    def calculate_energy_output(self):
        irradiance = self.generate_solar_irradiance()
        temperature = self.generate_temperature()
        temp_coefficient = -0.005
        temp_effect = max(0, 1 + temp_coefficient * (temperature - 25))
        energy_output = irradiance * self.panel_area * self.panel_efficiency * temp_effect
        energy_output += random.uniform(-self.noise_factor * energy_output, self.noise_factor * energy_output)
        return round(energy_output, 2)

    def get_device_data(self):
        return {
            "location": self.location,
            "irradiance": self.generate_solar_irradiance(),
            "temperature": self.generate_temperature(),
            "energy_output": self.calculate_energy_output(),
            "timestamp": time.time()
        }

