import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import './RiskChart.css';

const COLORS = {
  Healthy: '#22c55e',
  'At Risk': '#f59e0b',
  Critical: '#ef4444',
};

function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0];
  return (
    <div className="chart-tooltip">
      <span className="chart-tooltip-dot" style={{ background: item.payload.color || item.color }} />
      <span className="chart-tooltip-label">{item.name}</span>
      <span className="chart-tooltip-value">{item.value}</span>
    </div>
  );
}

function CenterLabel({ total }) {
  return (
    <div className="donut-center">
      <span className="donut-center-value">{total}</span>
      <span className="donut-center-label">Total</span>
    </div>
  );
}

function RiskChart({ analytics }) {
  const data = [
    { name: 'Healthy', value: analytics.healthy, color: COLORS.Healthy },
    { name: 'At Risk', value: analytics.at_risk, color: COLORS['At Risk'] },
    { name: 'Critical', value: analytics.critical, color: COLORS.Critical },
  ];

  const total = analytics.total_machines ?? data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="risk-chart-grid">
      <div className="risk-chart-container">
        <h3>Risk distribution</h3>
        <div className="donut-wrap">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={68}
                outerRadius={96}
                paddingAngle={3}
                cornerRadius={6}
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={8}
                formatter={(value) => <span className="chart-legend-text">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
          <CenterLabel total={total} />
        </div>
      </div>

      <div className="risk-chart-container">
        <h3>Machines by status</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--border)' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={56}>
              {data.map((entry, index) => (
                <Cell key={`bar-cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RiskChart;