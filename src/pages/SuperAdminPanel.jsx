import { useEffect, useState } from "react";
import API from "../api/axios";
import MainLayout from "../layouts/MainLayout";
import "../styles/superadminpanel.css";

export default function SuperAdminPanel() {
  const [companies, setCompanies] = useState([]);
  const [users, setUsers] = useState([]);

  // =========================
  // FETCH COMPANIES
  // =========================
  const fetchCompanies = async () => {
    try {
      const res = await API.get("/companies");
      const data = res?.data?.data || [];
      setCompanies(data);
    } catch (err) {
      console.error("Failed companies:", err);
      setCompanies([]);
    }
  };

  // =========================
  // FETCH USERS
  // =========================
  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      const data = res?.data?.data || [];
      setUsers(data);
    } catch (err) {
      console.error("Failed users:", err);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchCompanies();
    fetchUsers();
  }, []);

  // =========================
  // STATS
  // =========================
  const totalCompanies = companies.length;
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.isActive).length;
  const admins = users.filter(
    u => u.role === "admin" || u.role === "super_admin"
  ).length;

  return (
    <MainLayout>
      <div className="super-panel">

        <h1>Super Admin Control Center</h1>

        {/* STATS */}
        <div className="stats-grid">

          <div className="stat-card">
            <h2>{totalCompanies}</h2>
            <p>Companies</p>
          </div>

          <div className="stat-card">
            <h2>{totalUsers}</h2>
            <p>Total Users</p>
          </div>

          <div className="stat-card">
            <h2>{activeUsers}</h2>
            <p>Active Users</p>
          </div>

          <div className="stat-card">
            <h2>{admins}</h2>
            <p>Admins</p>
          </div>

        </div>

        {/* COMPANIES LIST */}
        <div className="section">
          <h2>Companies</h2>

          <div className="grid">
            {companies.map((c) => (
              <div key={c.id} className="card">
                <h3>{c.name}</h3>
                <p>Plan: {c.plan}</p>
                <p>Status: {c.isActive ? "Active" : "Disabled"}</p>
              </div>
            ))}
          </div>
        </div>

        {/* USERS LIST */}
        <div className="section">
          <h2>👥 Users</h2>

          <div className="grid">
            {users.map((u) => (
              <div key={u.id} className="card">
                <h3>{u.fullName}</h3>
                <p>{u.email}</p>
                <p>Role: {u.role}</p>
                <p>Company ID: {u.companyId}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </MainLayout>
  );
}