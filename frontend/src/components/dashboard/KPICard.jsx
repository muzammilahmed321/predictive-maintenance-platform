import './KPICard.css';

function KPICard({ label, value, color }) {
  return (
    <div className="kpi-card" style={{ '--kpi-color': color }}>
      <p className="kpi-label">{label}</p>
      <p className="kpi-value">{value}</p>
    </div>
  );
}

export default KPICard;