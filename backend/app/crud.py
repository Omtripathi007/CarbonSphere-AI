from sqlalchemy.orm import Session
from . import models, schemas
from datetime import datetime

# Core Calculation Logic
def calculate_personal_emission(db: Session, emission_create: schemas.PersonalEmissionCreate, user_id: int):
    # Fetch factor from DB
    factor_obj = db.query(models.EmissionFactor).filter(models.EmissionFactor.category == emission_create.category).first()
    
    # Default factors if not in DB (Initial Seed Data equivalents)
    default_factors = {
        "Electricity": 0.82,  # kg CO2/kWh
        "Petrol": 2.31,      # kg CO2/liter
        "Diesel": 2.68,      # kg CO2/liter
        "LPG": 1.5,          # kg CO2/kg
        "Flight": 0.15,       # kg CO2/km
        "Public Transport": 0.05 # kg CO2/km
    }
    
    factor = factor_obj.factor if factor_obj else default_factors.get(emission_create.category, 0.0)
    calculated_emissions = emission_create.value * factor
    
    db_emission = models.PersonalEmission(
        user_id=user_id,
        category=emission_create.category,
        value=emission_create.value,
        emissions=calculated_emissions
    )
    db.add(db_emission)
    db.commit()
    db.refresh(db_emission)
    return db_emission

def get_total_emissions_for_user(db: Session, user_id: int):
    emissions = db.query(models.PersonalEmission).filter(models.PersonalEmission.user_id == user_id).all()
    return sum(e.emissions for e in emissions)

def calculate_industrial_emission(db: Session, emission_create: schemas.IndustrialEmissionCreate, company_id: int):
    # Industrial logic can be more complex (Scope 1, 2, 3)
    # For simplicity, using a multiplier based on source/scope
    multiplier = 1.0
    if emission_create.scope == 1:
        multiplier = 1.5
    elif emission_create.scope == 2:
        multiplier = 0.8
    
    calculated_emissions = emission_create.value * multiplier
    
    db_emission = models.IndustrialEmission(
        company_id=company_id,
        scope=emission_create.scope,
        source=emission_create.source,
        value=emission_create.value,
        emissions=calculated_emissions,
        is_sensor_data=emission_create.is_sensor_data
    )
    db.add(db_emission)
    db.commit()
    db.refresh(db_emission)
    return db_emission

# User Management
def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    # In a real app, use pwd_context.hash(user.password)
    db_user = models.User(
        email=user.email,
        hashed_password=user.password, # Plain text for now for demo, fix later with passlib
        full_name=user.full_name,
        role=user.role
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
