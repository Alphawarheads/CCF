# app/schemas.py
from pydantic import BaseModel

class SolarPanelInput(BaseModel):
    lat: float
    lon: float
    start_date: str
    end_date: str
    api_key: str

class SolarPanelOutput(BaseModel):
    aoi: list
    cell_temperature: list
    dc: list
    ac: list
