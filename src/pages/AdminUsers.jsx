import { useEffect, useState } from "react";
import API from "../api/axios";
import MainLayout from "../layouts/MainLayout";
import "../styles/adminUsers.css";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [passwordModal, setPasswordModal] = useState(null);
  const [newPassword, setNewPassword] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data?.data || []);
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleStatus = async (id) => {
    try {
      await API.patch(`/admin/users/${id}/status`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const updateRole = async (id, role) => {
    try {
      await API.patch(`/admin/users/${id}/role`, { role });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const openPasswordModal = (user) => {
    setPasswordModal(user);
    setNewPassword("");
  };

  const resetPassword = async () => {
    try {
      await API.patch(`/admin/users/${passwordModal.id}/password`, {
        password: newPassword,
      });

      setPasswordModal(null);
      alert("Password updated");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MainLayout>
      <div className="admin-container">
        <h1>Admin Users</h1>

        {loading && <p>Loading users...</p>}

        <div className="admin-grid">
          {users.map((user) => (
            <div key={user.id} className="admin-card">

              <h3>{user.fullName}</h3>
              <p>{user.email}</p>

              <div className="row">
                <label>Role</label>
                <select
                  value={user.role}
                  onChange={(e) => updateRole(user.id, e.target.value)}
                >
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                  <option value="observer_admin">Observer</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>

              <div className="row">
                <label>Status</label>
                <button
                  className={user.isActive ? "active" : "inactive"}
                  onClick={() => toggleStatus(user.id)}
                >
                  {user.isActive ? "Active" : "Disabled"}
                </button>
              </div>

              <button
                className="password-btn"
                onClick={() => openPasswordModal(user)}
              >
                🔐 Reset Password
              </button>

            </div>
          ))}
        </div>

        {/* PASSWORD MODAL */}
        {passwordModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Reset Password</h3>

              <p>{passwordModal.email}</p>

              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <div className="modal-actions">
                <button onClick={() => setPasswordModal(null)}>
                  Cancel
                </button>

                <button onClick={resetPassword}>
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}