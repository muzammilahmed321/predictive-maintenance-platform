import { Link } from 'react-router-dom';
import './MachineCard.css';

function MachineCard({ machine }) {
  return (
    <div className="machine-card">
      <div className="machine-card-header">
        <h4>{machine.machine_id}</h4>
        <span className="machine-type">{machine.type}</span>
      </div>

      <div className="machine-card-body">
        <div className="machine-stat">
          <span className="stat-label">Air Temp</span>
          <span className="stat-value">{machine.air_temperature} K</span>
        </div>
        <div className="machine-stat">
          <span className="stat-label">Torque</span>
          <span className="stat-value">{machine.torque} Nm</span>
        </div>
        <div className="machine-stat">
          <span className="stat-label">Tool Wear</span>
          <span className="stat-value">{machine.tool_wear} min</span>
        </div>
      </div>

      <Link to={`/machines/${machine.machine_id}`} className="machine-card-link">
        View Details
      </Link>
    </div>
  );
}

export default MachineCard;