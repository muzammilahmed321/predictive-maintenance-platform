import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { predictFailure } from '../services/api';
import './Predict.css';

function Predict() {
  const navigate = useNavigate();

  const [type, setType] = useState('L');
  const [airTemp, setAirTemp] = useState('');
  const [processTemp, setProcessTemp] = useState('');
  const [rotationalSpeed, setRotationalSpeed] = useState('');
  const [torque, setTorque] = useState('');
  const [toolWear, setToolWear] = useState('');

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    setResult(null);
    setLoading(true);
    setError(null);

    const inputData = {
      Type: type,
      'Air temperature': parseFloat(airTemp),
      'Process temperature': parseFloat(processTemp),
      'Rotational speed': parseFloat(rotationalSpeed),
      Torque: parseFloat(torque),
      'Tool wear': parseFloat(toolWear),
    };

    try {
      const response = await predictFailure(inputData);
      setResult(response);
    } catch (err) {
      setError('Something went wrong. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="predict-page">
      <h2>Predict Machine Failure</h2>
      <p className="page-subtitle">Enter sensor readings to get a live failure risk prediction</p>

      <form onSubmit={handleSubmit} className="predict-form">

        <label>
          Type
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="L">L</option>
            <option value="M">M</option>
            <option value="H">H</option>
          </select>
        </label>

        <label>
          Air Temperature (K)
          <input
            type="number"
            value={airTemp}
            onChange={(e) => setAirTemp(e.target.value)}
            required
          />
        </label>

        <label>
          Process Temperature (K)
          <input
            type="number"
            value={processTemp}
            onChange={(e) => setProcessTemp(e.target.value)}
            required
          />
        </label>

        <label>
          Rotational Speed (rpm)
          <input
            type="number"
            value={rotationalSpeed}
            onChange={(e) => setRotationalSpeed(e.target.value)}
            required
          />
        </label>

        <label>
          Torque (Nm)
          <input
            type="number"
            value={torque}
            onChange={(e) => setTorque(e.target.value)}
            required
          />
        </label>

        <label>
          Tool Wear (min)
          <input
            type="number"
            value={toolWear}
            onChange={(e) => setToolWear(e.target.value)}
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict'}
        </button>

      </form>

      {error && <p className="error-message">{error}</p>}

      {result && (
        <div className={`result-card risk-${result.risk_level.toLowerCase()}`}>
          <h3>{result.prediction}</h3>
          <p>Failure Probability: {(result.failure_probability * 100).toFixed(1)}%</p>
          <p>Risk Level: {result.risk_level}</p>
          <button className="view-dashboard-btn" onClick={() => navigate('/')}>
            View in Dashboard
          </button>
        </div>
      )}

    </div>
  );
}

export default Predict;