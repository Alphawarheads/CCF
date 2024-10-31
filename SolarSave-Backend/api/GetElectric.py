import requests
import pandas as pd
from datetime import datetime, timedelta
from pvlib import location, pvsystem
from pvlib.modelchain import ModelChain
from pvlib.temperature import TEMPERATURE_MODEL_PARAMETERS


class SolarPVModel:
    def __init__(self, lat, lon, api_key, sandia_module_name='Canadian_Solar_CS5P_220M___2009_',
                 cec_inverter_name='ABB__MICRO_0_25_I_OUTD_US_208__208V_'):
        self.lat = lat
        self.lon = lon
        self.api_key = api_key

        # 设置位置信息
        self.site = location.Location(self.lat, self.lon, tz='Asia/Shanghai')

        # 获取Sandia模块和cec逆变器配置
        sandia_modules = pvsystem.retrieve_sam('SandiaMod')
        cec_inverters = pvsystem.retrieve_sam('cecinverter')

        # 使用输入参数选择光伏模块和逆变器，默认使用预设值
        self.sandia_module = sandia_modules.get(sandia_module_name, sandia_modules['Canadian_Solar_CS5P_220M___2009_'])
        self.cec_inverter = cec_inverters.get(cec_inverter_name, cec_inverters['ABB__MICRO_0_25_I_OUTD_US_208__208V_'])

        # SAPM模型参数
        self.temperature_model_parameters = TEMPERATURE_MODEL_PARAMETERS['sapm']['open_rack_glass_glass']

    def get_weather_data(self, date_time=None):
        """通过OpenWeather API获取指定时间或当前天气数据，包括温度和风速"""
        if date_time is None:
            # 默认获取当前时间前一天的数据
            date_time = datetime.now() - timedelta(days=1)
        url = f'http://api.openweathermap.org/data/2.5/weather?lat={self.lat}&lon={self.lon}&appid={self.api_key}&units=metric'
        response = requests.get(url)
        weather_data = response.json()

        temp_air = weather_data['main']['temp']  # 空气温度，单位：摄氏度
        wind_speed = weather_data['wind']['speed']  # 风速，单位：米/秒

        print(f"获取时间 {date_time.strftime('%Y-%m-%d %H:%M:%S')} 的天气数据:")
        print(f"空气温度: {temp_air}°C")
        print(f"风速: {wind_speed} m/s")
        return temp_air, wind_speed

    def run_model(self, start_date, periods=24, freq='60min'):
        """运行光伏模型，输入开始日期、时间段和频率，输出电池温度等数据"""
        # 实例化一个PVSystem对象
        system = pvsystem.PVSystem(surface_tilt=20, surface_azimuth=200,
                                   module_parameters=self.sandia_module,
                                   inverter_parameters=self.cec_inverter,
                                   temperature_model_parameters=self.temperature_model_parameters)
        # 实例化ModelChain对象
        mc = ModelChain(system, self.site)

        # 创建日期和时间范围
        times = pd.date_range(start_date, freq=freq, periods=periods, tz=self.site.tz)

        # 获取晴天的辐照度
        clearsky = self.site.get_clearsky(times)
        dni = clearsky['dni']
        ghi = clearsky['ghi']
        dhi = clearsky['dhi']

        # 获取OpenWeather API的空气温度和风速
        temp_air, wind_speed = self.get_weather_data()

        # 构造实时天气数据
        weather = pd.DataFrame({
            'ghi': ghi,
            'dni': dni,
            'dhi': dhi,
            'temp_air': temp_air,  # 从API获取的空气温度
            'wind_speed': wind_speed  # 从API获取的风速
        }, index=times)

        # 运行模型
        mc.run_model(weather)

        # 输出相关结果
        return {
            'aoi': mc.results.aoi,  # 入射角
            'cell_temperature': mc.results.cell_temperature,  # 电池温度
            'dc': mc.results.dc,  # 直流电功率
            'ac': mc.results.ac  # 交流电功率
        }

    def run_model_for_time_range(self, start_date, end_date, freq='60min'):
        """运行光伏模型，输入开始日期和结束日期以及频率"""
        periods = int((pd.to_datetime(end_date) - pd.to_datetime(start_date)) / pd.Timedelta(freq)) + 1
        return self.run_model(start_date, periods=periods, freq=freq)


if __name__ == "__main__":
    # 使用示例
    api_key = '0771554279f9204c977c7bf619352830'  # 替换为你的OpenWeather API密钥
    lat, lon = 45.739, 120.683  # 哈尔滨的经纬度

    # 创建类实例，传入光伏模块和逆变器的名称
    solar_model = SolarPVModel(lat, lon, api_key, sandia_module_name='Canadian_Solar_CS5P_220M___2009_',
                               cec_inverter_name='ABB__MICRO_0_25_I_OUTD_US_208__208V_')

    # 获取某个时间点的数据（默认为当前时间前一天）
    solar_model.get_weather_data()

    # 运行模型，获取一段时间内的光伏系统模拟数据
    results = solar_model.run_model_for_time_range(start_date='2022-06-21', end_date='2022-06-22', freq='60min')

    # 打印结果
    print("入射角:", results['aoi'])
    print("电池温度:", results['cell_temperature'])
    print("直流功率:", results['dc'])
    print("交流功率:", results['ac'])
