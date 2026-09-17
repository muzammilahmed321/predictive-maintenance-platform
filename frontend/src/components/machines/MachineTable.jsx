import { Link } from 'react-router-dom';
import './MachineTable.css';

function MachineTable({ machines }) {
  return (
    <div className="machine-table-wrap">
      <table className="machine-table">
        <thead>
          <tr>
            <th>Machine ID</th>
            <th>Type</th>
            <th>Air Temp</th>
            <th>Torque</th>
            <th>Tool Wear</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {machines.map((machine) => (
            <tr key={machine.machine_id}>
              <td className="machine-id-cell">{machine.machine_id}</td>
              <td>
                <span className="type-badge">{machine.type}</span>
              </td>
              <td>{machine.air_temperature} K</td>
              <td>{machine.torque} Nm</td>
              <td>{machine.tool_wear} min</td>
              <td>
                <Link className="view-link" to={`/machines/${machine.machine_id}`}>
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MachineTable;