import { useEffect, useState } from "react";
import API from "../api/axios";
import MainLayout from "../layouts/MainLayout";
import "../styles/superadmin.css";

export default function SuperAdminDashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH USERS
  // =========================
  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      const data = res?.data?.data || [];
      setUsers(data);
    } catch (err) {
      console.error("Failed to load users:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // =========================
  // TOGGLE STATUS
  // =========================
  const toggleUser = async (id) => {
    try {
      await API.patch(`/users/${id}/status`);
      fetchUsers();
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  // =========================
  // RESET PASSWORD
  // =========================
  const resetPassword = async (id) => {
    const newPassword = prompt("Enter new password:");
    if (!newPassword) return;

    try {
      await API.patch(`/users/${id}/reset-password`, {
        newPassword,
      });

      alert("Password reset successful");
    } catch (err) {
      console.error("Reset failed:", err);
    }
  };

  // =========================
  // FILTER
  // =========================
  const filteredUsers = users.filter((u) =>
    (u.fullName || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="superadmin-page">
        <div className="superadmin-container">

          <div className="superadmin-header">
            <h1>Super Admin Dashboard</h1>

            <input
              className="search-box"
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading && <p className="muted">Loading users...</p>}

          {!loading && filteredUsers.length === 0 && (
            <p className="muted">No users found.</p>
          )}

          <div className="users-grid">
            {filteredUsers.map((user) => (
              <div key={user.id} className="user-card">

                <div className="user-top">
                  <h3>{user.fullName}</h3>
                  <span className={user.isActive ? "active" : "disabled"}>
                    {user.isActive ? "Active" : "Disabled"}
                  </span>
                </div>

                <p>{user.email}</p>
                <p><b>Role:</b> {user.role}</p>

                <div className="btn-group">
                  <button
                    className="btn toggle"
                    onClick={() => toggleUser(user.id)}
                  >
                    {user.isActive ? "Disable" : "Enable"}
                  </button>

                  <button
                    className="btn reset"
                    onClick={() => resetPassword(user.id)}
                  >
                    Reset Password
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </MainLayout>
  );
}