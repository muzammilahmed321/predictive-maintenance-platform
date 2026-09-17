import { useState, useEffect } from 'react';
import KPICard from '../components/dashboard/KPICard';
import RiskChart from '../components/dashboard/RiskChart';
import MachineTable from '../components/machines/MachineTable';
import Loader from '../components/common/Loader';
import { getMachines, getAnalytics } from '../services/api';
import './Dashboard.css';

function Dashboard() {
  const [machines, setMachines] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const machineData = await getMachines();
        const analyticsData = await getAnalytics();
        setMachines(machineData.machines);
        setAnalytics(analyticsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="dashboard">
      <h2>Machine health dashboard</h2>
      <p className="dashboard-subtitle">Live overview of {analytics.total_machines} machines across the plant</p>

      <div className="kpi-row">
        <KPICard label="Total Machines" value={analytics.total_machines} color="#3b82f6" />
        <KPICard label="Healthy" value={analytics.healthy} color="#22c55e" />
        <KPICard label="At Risk" value={analytics.at_risk} color="#f59e0b" />
        <KPICard label="Critical" value={analytics.critical} color="#ef4444" />
      </div>

      <h3 className="section-title">Risk overview</h3>
      <RiskChart analytics={analytics} />

      <h3 className="section-title">All machines</h3>
      <MachineTable machines={machines} />
    </div>
  );
}

export default Dashboard;