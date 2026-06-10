import { useEffect, useState } from "react";
import API from "../api/axios";
import MainLayout from "../layouts/MainLayout";
import "../styles/leads.css";

export default function Leads({ search }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // SAFE FETCH
  // =========================
  const fetchLeads = async () => {
    try {
      const res = await API.get("/customers");

      const raw = res?.data;

      const customers = Array.isArray(raw)
        ? raw
        : Array.isArray(raw?.data)
        ? raw.data
        : Array.isArray(raw?.rows)
        ? raw.rows
        : [];

      const onlyLeads = customers
        .filter((c) => c?.status === "lead")
        .sort((a, b) => (b?.score || 0) - (a?.score || 0));

      setLeads(onlyLeads);
    } catch (err) {
      console.error("Failed to load leads:", err);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // =========================
  // CALL LEAD
  // =========================
  const handleCall = (phone) => {
    if (!phone) return alert("No phone number available");
    window.location.href = `tel:${phone}`;
  };

  // =========================
  // CONVERT LEAD
  // =========================
  const handleConvert = async (id) => {
    try {
      await API.patch(`/customers/${id}/status`, {
        status: "active",
      });

      fetchLeads();
    } catch (err) {
      console.error("Convert failed:", err);
      alert("Convert failed");
    }
  };

  // =========================
  // DELETE LEAD
  // =========================
  const handleDelete = async (id) => {
    try {
      await API.delete(`/customers/${id}`);
      setLeads((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed");
    }
  };

  // =========================
  // 🔥 SEARCH FILTER (NEW)
  // =========================
  const filteredLeads = leads.filter((lead) => {
    const q = (search || "").toLowerCase();

    return (
      lead?.fullName?.toLowerCase().includes(q) ||
      lead?.email?.toLowerCase().includes(q) ||
      lead?.phone?.toLowerCase().includes(q)
    );
  });

  return (
    <MainLayout>
      <div className="leads-container">
        <h1>AI Ranked Leads</h1>

        {loading && <p>Loading leads...</p>}

        {!loading && filteredLeads.length === 0 && (
          <p>No matching leads found.</p>
        )}

        <div className="leads-grid">
          {filteredLeads.map((lead) => (
            <div key={lead.id} className="lead-card">
              <h3>{lead.fullName}</h3>

              <p>{lead.email}</p>
              <p>📞 {lead.phone || "No phone"}</p>

              <p>
                <b>AI Score:</b> {lead.score || 0}
              </p>

              <button onClick={() => handleCall(lead.phone)}>
                📞 Call
              </button>

              <button onClick={() => handleConvert(lead.id)}>
                ✅ Convert
              </button>

              <button onClick={() => handleDelete(lead.id)}>
                🗑 Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}