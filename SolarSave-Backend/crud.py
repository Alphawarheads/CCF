from sqlalchemy.orm import Session
from . import models, schemas

def get_panels(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.SolarPanel).offset(skip).limit(limit).all()

def create_panel(db: Session, panel: schemas.SolarPanelCreate):
    db_panel = models.SolarPanel(**panel.dict())
    db.add(db_panel)
    db.commit()
    db.refresh(db_panel)
    return db_panel
