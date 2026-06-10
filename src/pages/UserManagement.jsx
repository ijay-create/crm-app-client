import { useEffect, useMemo, useState } from "react";
import API from "../api/axios";
import MainLayout from "../layouts/MainLayout";
import "../styles/usermanagement.css";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // 🟢 NEW: companies list (safe future upgrade)
  const [companies, setCompanies] = useState([]);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "staff",
    companyId: "",
  });

  // =========================
  // FETCH USERS
  // =========================
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await API.get("/users");

      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.data)
        ? res.data.data
        : [];

      setUsers(data);
    } catch (err) {
      console.error("Failed to load users:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH COMPANIES (SAFE)
  // =========================
  const fetchCompanies = async () => {
    try {
      const res = await ("/companies");

      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.data)
        ? res.data.data
        : [];

      setCompanies(data);
    } catch (err) {
      console.warn("Companies not ready yet:", err.message);
      setCompanies([]); // safe fallback
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCompanies();
  }, []);

  // =========================
  // FORM INPUT
  // =========================
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // =========================
  // CREATE USER
  // =========================
  const handleCreateUser = async () => {
    try {
      if (
        !form.fullName.trim() ||
        !form.email.trim() ||
        !form.password.trim()
      ) {
        return alert("Please fill all required fields.");
      }

      await API.post("/users", {
        ...form,
        companyId: form.companyId
          ? Number(form.companyId)
          : undefined,
      });

      alert("User created successfully");

      setForm({
        fullName: "",
        email: "",
        password: "",
        role: "staff",
        companyId: "",
      });

      fetchUsers();
    } catch (err) {
      console.error("Create user failed:", err);

      alert(
        err?.response?.data?.message || "Failed to create user"
      );
    }
  };

  // =========================
  // ENABLE / DISABLE
  // =========================
  const toggleStatus = async (id) => {
    try {
      await API.patch(`/users/${id}/status`);
      fetchUsers();
    } catch (err) {
      console.error("Status update failed:", err);
      alert("Failed to update user status");
    }
  };

  // =========================
  // SEARCH FILTER
  // =========================
  const filteredUsers = useMemo(() => {
    const term = search.toLowerCase();

    return users.filter((user) => {
      return (
        (user.fullName || "").toLowerCase().includes(term) ||
        (user.email || "").toLowerCase().includes(term) ||
        (user.role || "").toLowerCase().includes(term)
      );
    });
  }, [users, search]);

  return (
    <MainLayout>
      <div className="users-container">

        {/* HEADER */}
        <div className="users-header">
          <h1>👥 User Management</h1>
          <p className="page-subtitle">
            Create and manage system users, roles and access control.
          </p>
        </div>

        {/* CREATE USER */}
        <div className="user-form">

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
            <option value="observer_admin">Observer Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>

          {/* 🟢 FIXED: COMPANY DROPDOWN (SAFE) */}
          <select
            name="companyId"
            value={form.companyId}
            onChange={handleChange}
          >
            <option value="">Select Company</option>

            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <button
            className="create-user-btn"
            onClick={handleCreateUser}
          >
            Create User
          </button>
        </div>

        {/* SEARCH */}
        <div className="users-search">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* LOADING */}
        {loading && (
          <p className="loading-text">Loading users...</p>
        )}

        {/* EMPTY */}
        {!loading && filteredUsers.length === 0 && (
          <div className="empty-users">
            <p>No users found.</p>
          </div>
        )}

        {/* GRID */}
        {!loading && filteredUsers.length > 0 && (
          <div className="users-grid">
            {filteredUsers.map((user) => (
              <div key={user.id} className="user-card">

                <div className="user-card-header">
                  <h3>{user.fullName}</h3>

                  <span
                    className={
                      user.isActive
                        ? "status-active"
                        : "status-disabled"
                    }
                  >
                    {user.isActive ? "Active" : "Disabled"}
                  </span>
                </div>

                <div className="user-details">
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Role:</strong> {user.role}</p>
                  <p><strong>Company:</strong> {user.companyId || "N/A"}</p>
                </div>

                <div className="user-actions">
                  <button
                    className={
                      user.isActive ? "disable-btn" : "enable-btn"
                    }
                    onClick={() => toggleStatus(user.id)}
                  >
                    {user.isActive ? "Disable" : "Enable"}
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </MainLayout>
  );
}