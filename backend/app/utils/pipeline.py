import pandas as pd
import numpy as np

def prepare_input(machine_dict, scaler, feature_columns):
    df_input = pd.DataFrame([machine_dict])

    df_input['Temp_diff'] = df_input['Process temperature'] - df_input['Air temperature']
    df_input['Power'] = df_input['Torque'] * (df_input['Rotational speed'] * 2 * np.pi / 60)
    df_input['Torque_per_wear'] = df_input['Torque'] / (df_input['Tool wear'] + 1)

    df_input['Type_L'] = 1 if machine_dict['Type'] == 'L' else 0
    df_input['Type_M'] = 1 if machine_dict['Type'] == 'M' else 0

    df_input = df_input.rename(columns={
        'Air temperature': 'Air temperature [K]',
        'Process temperature': 'Process temperature [K]',
        'Rotational speed': 'Rotational speed [rpm]',
        'Torque': 'Torque [Nm]',
        'Tool wear': 'Tool wear [min]'
    })

    num_cols = ['Air temperature [K]', 'Process temperature [K]', 'Rotational speed [rpm]',
                'Torque [Nm]', 'Tool wear [min]', 'Temp_diff', 'Power', 'Torque_per_wear']
    df_input[num_cols] = scaler.transform(df_input[num_cols])

    df_input.columns = [c.replace('[', '').replace(']', '') for c in df_input.columns]
    df_input = df_input[feature_columns]

    return df_input


def get_failure_probability(machine_dict, model, scaler, feature_columns):
    df_input = prepare_input(machine_dict, scaler, feature_columns)
    proba = model.predict_proba(df_input)[:, 1][0]
    return proba