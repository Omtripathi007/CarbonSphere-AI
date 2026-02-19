from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from . import crud, models, schemas, database

# Create tables (In a production app, use Alembic)
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="CarbonSphere AI API", version="1.0.0")

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to CarbonSphere AI API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# User Endpoints
@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)

# Calculation Endpoints
@app.post("/calculate/personal", response_model=schemas.PersonalEmission)
def calculate_personal(
    emission: schemas.PersonalEmissionCreate, 
    user_id: int, 
    db: Session = Depends(database.get_db)
):
    return crud.calculate_personal_emission(db, emission, user_id)

@app.post("/calculate/industrial", response_model=schemas.IndustrialEmission)
def calculate_industrial(
    emission: schemas.IndustrialEmissionCreate, 
    company_id: int, 
    db: Session = Depends(database.get_db)
):
    return crud.calculate_industrial_emission(db, emission, company_id)

@app.get("/ai/recommend/{user_id}", response_model=List[schemas.AIInsight])
def get_ai_recommendations(user_id: int, db: Session = Depends(database.get_db)):
    # Placeholder for OpenAI integration
    insights = [
        {
            "id": 1,
            "user_id": user_id,
            "insight_type": "Optimization",
            "content": "Switching to solar could reduce your footprint by 40%.",
            "recommendations": {"action": "Install Solar", "ROI": "3.5 years"},
            "created_at": "2024-02-19T00:00:00"
        }
    ]
    return insights

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
