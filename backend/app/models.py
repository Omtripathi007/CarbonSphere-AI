from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Enum, JSON, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base
import enum

class UserRole(str, enum.Enum):
    CITIZEN = "citizen"
    COMPANY = "company"
    GOVERNMENT_OFFICER = "government_officer"
    ADMIN = "admin"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    role = Column(String, default=UserRole.CITIZEN)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    personal_emissions = relationship("PersonalEmission", back_populates="user")
    industrial_emissions = relationship("IndustrialEmission", back_populates="company")

class EmissionFactor(Base):
    __tablename__ = "emission_factors"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String, index=True)  # e.g., Electricity, Petrol, LPG
    unit = Column(String)  # e.g., kWh, Liter
    factor = Column(Float)  # kg CO2 per unit
    region = Column(String, default="Global")
    last_updated = Column(DateTime(timezone=True), server_default=func.now())

class PersonalEmission(Base):
    __tablename__ = "personal_emissions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    category = Column(String)
    value = Column(Float)  # Consumption value
    emissions = Column(Float)  # Calculated kg CO2
    date = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="personal_emissions")

class IndustrialEmission(Base):
    __tablename__ = "industrial_emissions"

    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("users.id"))
    scope = Column(Integer)  # 1, 2, or 3
    source = Column(String)
    value = Column(Float)
    emissions = Column(Float)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    is_sensor_data = Column(Boolean, default=False)

    company = relationship("User", back_populates="industrial_emissions")

class CarbonCredit(Base):
    __tablename__ = "carbon_credits"

    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    amount = Column(Float)
    status = Column(String)  # earned, traded, retired
    source = Column(String)  # EV, Solar, etc.
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class CarbonTransaction(Base):
    __tablename__ = "carbon_transactions"

    id = Column(Integer, primary_key=True, index=True)
    seller_id = Column(Integer, ForeignKey("users.id"))
    buyer_id = Column(Integer, ForeignKey("users.id"))
    credits_amount = Column(Float)
    price = Column(Float)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

class GovernmentReport(Base):
    __tablename__ = "government_reports"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content = Column(JSON)
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class AIInsight(Base):
    __tablename__ = "ai_insights"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    insight_type = Column(String)
    content = Column(String)
    recommendations = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class PolicySimulation(Base):
    __tablename__ = "policy_simulations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    parameters = Column(JSON)
    results = Column(JSON)
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
