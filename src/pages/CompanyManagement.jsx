import { useEffect, useState } from "react";
import API from "../api/axios";
import MainLayout from "../layouts/MainLayout";
import "../styles/company.css";

export default function CompanyManagement() {
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({
    name: "",
    plan: "free",
  });

  const fetchCompanies = async () => {
    try {
      const res = await API.get("/companies");
      setCompanies(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch companies", err);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleCreate = async () => {
    try {
      await API.post("/companies", form);
      setForm({ name: "", plan: "free" });
      fetchCompanies();
    } catch (err) {
      console.error(err);
      alert("Failed to create company");
    }
  };

  return (
    <MainLayout>
      <div className="company-container">
        <h1>Company Management</h1>

        <div className="company-form">
          <input
            type="text"
            placeholder="Company Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <select
            value={form.plan}
            onChange={(e) =>
              setForm({ ...form, plan: e.target.value })
            }
          >
            <option value="free">Free</option>
            <option value="pro">Pro</option>
            <option value="enterprise">Enterprise</option>
          </select>

          <button onClick={handleCreate}>
            Create Company
          </button>
        </div>

        <div className="company-grid">
          {companies.map((c) => (
            <div key={c.id} className="company-card">
              <h3>{c.name}</h3>
              <p>Plan: {c.plan}</p>
              <p>Status: {c.isActive ? "Active" : "Disabled"}</p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}