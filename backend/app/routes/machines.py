from fastapi import APIRouter
import random

router = APIRouter()

types = ["L", "M", "H"]

def generate_dummy_machines(n=20):
    machines = []
    for i in range(1, n + 1):
        machines.append({
            "machine_id": f"M-{1000 + i}",
            "type": random.choice(types),
            "air_temperature": round(random.uniform(295, 305), 1),
            "process_temperature": round(random.uniform(305, 314), 1),
            "rotational_speed": round(random.uniform(1200, 2800)),
            "torque": round(random.uniform(10, 75), 1),
            "tool_wear": round(random.uniform(0, 250)),
        })
    return machines

DUMMY_MACHINES = generate_dummy_machines(20)

@router.get("/machines")
def get_machines():
    return {"machines": DUMMY_MACHINES, "count": len(DUMMY_MACHINES)}

@router.get("/machines/{machine_id}")
def get_machine(machine_id: str):
    for machine in DUMMY_MACHINES:
        if machine["machine_id"] == machine_id:
            return machine
    return {"error": "Machine not found"}

next_id_counter = len(DUMMY_MACHINES) + 1

def add_machine(machine_dict):
    global next_id_counter
    new_machine = {
        "machine_id": f"M-{1000 + next_id_counter}",
        **machine_dict
    }
    DUMMY_MACHINES.append(new_machine)
    next_id_counter += 1
    return new_machine