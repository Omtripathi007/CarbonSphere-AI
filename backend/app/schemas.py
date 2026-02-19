from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from .models import UserRole

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    role: UserRole = UserRole.CITIZEN

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class EmissionFactorBase(BaseModel):
    category: str
    unit: str
    factor: float
    region: str = "Global"

class EmissionFactor(EmissionFactorBase):
    id: int
    last_updated: datetime

    class Config:
        from_attributes = True

class PersonalEmissionBase(BaseModel):
    category: str
    value: float

class PersonalEmissionCreate(PersonalEmissionBase):
    pass

class PersonalEmission(PersonalEmissionBase):
    id: int
    user_id: int
    emissions: float
    date: datetime

    class Config:
        from_attributes = True

class IndustrialEmissionBase(BaseModel):
    scope: int
    source: str
    value: float
    is_sensor_data: bool = False

class IndustrialEmissionCreate(IndustrialEmissionBase):
    pass

class IndustrialEmission(IndustrialEmissionBase):
    id: int
    company_id: int
    emissions: float
    timestamp: datetime

    class Config:
        from_attributes = True

class CarbonCreditBase(BaseModel):
    amount: float
    source: str

class CarbonCredit(CarbonCreditBase):
    id: int
    owner_id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class AIInsightBase(BaseModel):
    insight_type: str
    content: str
    recommendations: Dict[str, Any]

class AIInsight(AIInsightBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class PolicySimulationBase(BaseModel):
    name: str
    parameters: Dict[str, Any]

class PolicySimulation(PolicySimulationBase):
    id: int
    results: Dict[str, Any]
    created_by: int
    created_at: datetime

    class Config:
        from_attributes = True
