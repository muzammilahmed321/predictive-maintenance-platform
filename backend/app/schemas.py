from pydantic import BaseModel, Field
from typing import Literal
class MachineInput(BaseModel):
    Type: Literal["L", "M", "H"]
    Air_temperature: float = Field(..., alias="Air temperature")
    Process_temperature: float = Field(..., alias="Process temperature")
    Rotational_speed: float = Field(..., alias="Rotational speed")
    Torque: float
    Tool_wear: float = Field(..., alias="Tool wear")

    class Config:
        populate_by_name = True

class PredictionOutput(BaseModel):
    failure_probability: float
    prediction: str
    risk_level: str