from fastapi import APIRouter

from app.routes.machines import DUMMY_MACHINES
from app.routes.predict import model, scaler, feature_columns
from app.utils.pipeline import get_failure_probability

router = APIRouter()

@router.get("/analytics")
def get_analytics():
    healthy = 0
    at_risk = 0
    critical = 0

    for machine in DUMMY_MACHINES:
        machine_dict = {
            "Type": machine["type"],
            "Air temperature": machine["air_temperature"],
            "Process temperature": machine["process_temperature"],
            "Rotational speed": machine["rotational_speed"],
            "Torque": machine["torque"],
            "Tool wear": machine["tool_wear"]
        }
        proba = get_failure_probability(machine_dict, model, scaler, feature_columns)

        if proba >= 0.7:
            critical += 1
        elif proba >= 0.4:
            at_risk += 1
        else:
            healthy += 1

    return {
        "total_machines": len(DUMMY_MACHINES),
        "healthy": healthy,
        "at_risk": at_risk,
        "critical": critical
    }