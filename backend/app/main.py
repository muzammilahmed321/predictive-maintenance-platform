from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import predict, machines, analytics

app = FastAPI(title="Predictive Maintenance API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict.router)
app.include_router(machines.router)
app.include_router(analytics.router)
@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/")
def root():
    return {"message": "Predictive Maintenance API is running"}