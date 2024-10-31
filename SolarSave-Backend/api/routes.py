# app/api/routes.py
from fastapi import APIRouter, HTTPException
from api.GetElectric import SolarPVModel
from schemas import SolarPanelInput, SolarPanelOutput

router = APIRouter()

@router.post("/solar-data", response_model=SolarPanelOutput)
def get_solar_data(data: SolarPanelInput):
    solar_model = SolarPVModel(data.lat, data.lon, data.api_key)
    result = solar_model.run_model_for_time_range(data.start_date, data.end_date)
    return result
