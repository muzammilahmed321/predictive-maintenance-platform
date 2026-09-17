import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMachineById, predictFailure } from '../services/api';
import './MachineDetails.css';

function MachineDetails() {
  const { machineId } = useParams();

  const [machine, setMachine] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const machineData = await getMachineById(machineId);
        setMachine(machineData);

        const inputData = {
          Type: machineData.type,
          'Air temperature': machineData.air_temperature,
          'Process temperature': machineData.process_temperature,
          'Rotational speed': machineData.rotational_speed,
          Torque: machineData.torque,
          'Tool wear': machineData.tool_wear,
        };

        const predictionData = await predictFailure(inputData);
        setPrediction(predictionData);
      } catch (error) {
        setError('Failed to load machine details.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [machineId]);

  if (loading) return <p>Loading machine details...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="machine-details">
      <h2>Machine {machine.machine_id}</h2>

      <div className="details-grid">
        <div className="detail-item">
          <span className="detail-label">Type</span>
          <span className="detail-value">{machine.type}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Air Temperature</span>
          <span className="detail-value">{machine.air_temperature} K</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Process Temperature</span>
          <span className="detail-value">{machine.process_temperature} K</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Rotational Speed</span>
          <span className="detail-value">{machine.rotational_speed} rpm</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Torque</span>
          <span className="detail-value">{machine.torque} Nm</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Tool Wear</span>
          <span className="detail-value">{machine.tool_wear} min</span>
        </div>
      </div>

      {prediction && (
        <div className={`prediction-card risk-${prediction.risk_level.toLowerCase()}`}>
          <h3>{prediction.prediction}</h3>
          <p>Failure Probability: {(prediction.failure_probability * 100).toFixed(1)}%</p>
          <p>Risk Level: {prediction.risk_level}</p>
        </div>
      )}
    </div>
  );
}

export default MachineDetails;