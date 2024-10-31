from pydantic import BaseModel

class SolarPanelBase(BaseModel):
    name: str
    location: str
    battery_temp: float
    dc_power: float
    ac_power: float

class SolarPanelCreate(SolarPanelBase):
    pass

class SolarPanel(SolarPanelBase):
    id: int

    class Config:
        orm_mode = True
