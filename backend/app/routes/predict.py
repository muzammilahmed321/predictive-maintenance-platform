from fastapi import APIRouter
import joblib
import os

from app.schemas import MachineInput, PredictionOutput
from app.utils.pipeline import get_failure_probability
from app.routes.machines import add_machine

router = APIRouter()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS_DIR = os.path.join(BASE_DIR, "models")

model = joblib.load(os.path.join(MODELS_DIR, "pm_xgb_model.pkl"))
scaler = joblib.load(os.path.join(MODELS_DIR, "pm_scaler.pkl"))
threshold = joblib.load(os.path.join(MODELS_DIR, "pm_threshold.pkl"))
feature_columns = joblib.load(os.path.join(MODELS_DIR, "pm_feature_columns.pkl"))

@router.post("/predict", response_model=PredictionOutput)
def predict(input_data: MachineInput):
    machine_dict = input_data.dict(by_alias=True)
    proba = get_failure_probability(machine_dict, model, scaler, feature_columns)
    prediction = int(proba >= threshold)

    add_machine({
        "type": input_data.Type,
        "air_temperature": machine_dict['Air temperature'],
        "process_temperature": machine_dict['Process temperature'],
        "rotational_speed": machine_dict['Rotational speed'],
        "torque": machine_dict['Torque'],
        "tool_wear": machine_dict['Tool wear'],
    })

    return PredictionOutput(
        failure_probability=round(float(proba), 4),
        prediction="Failure" if prediction == 1 else "No Failure",
        risk_level="HIGH" if proba >= 0.7 else "MEDIUM" if proba >= 0.4 else "LOW"
    )