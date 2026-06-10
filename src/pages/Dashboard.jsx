import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { fetchDashboardStats } from "../api/analytics";
import AnalyticsCharts from "../components/Dashboard/AnalyticsCharts";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    leads: 0,
    active: 0,
    inactive: 0,
  });

  const loadStats = async () => {
    const res = await fetchDashboardStats();

    setStats(res.data);
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <MainLayout>
      <div className="dashboard">

        <div className="welcome-card">
          <h1>CRM Overview</h1>

          <p>
            Insights into your customers and pipeline.
          </p>
        </div>

        <div className="stats-grid">

          <div className="stat-card">
            <h3>Total Customers</h3>
            <h2>{stats.totalCustomers}</h2>
          </div>

          <div className="stat-card">
            <h3>Leads</h3>
            <h2>{stats.leads}</h2>
          </div>

          <div className="stat-card">
            <h3>Active</h3>
            <h2>{stats.active}</h2>
          </div>

          <div className="stat-card">
            <h3>Inactive</h3>
            <h2>{stats.inactive}</h2>
          </div>

        </div>
        <AnalyticsCharts stats={stats} />

      </div>
    </MainLayout>
  );
};

export default Dashboard;