import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";
import "../styles/settings.css";

export default function Settings() {
  const { user } = useAuth();
  const handleChangePassword = async () => {
    const newPassword = prompt("Enter new password:");

    if (!newPassword) return;

    try {
      await API.patch(`/users/${user.id}/reset-password`, {
        newPassword,
      });

      alert("Password updated successfully");
    } catch (err) {
      console.error("Password change failed:", err);
      alert("Failed to change password");
    }
 };
  return (
    <MainLayout>
      <div className="settings-container">

        <h1 className="settings-title">Settings</h1>

        {/* PROFILE CARD */}
        <div className="settings-card">
          <h3>👤 Profile</h3>

          <div className="settings-row">
            <span>Name</span>
            <strong>{user?.fullName}</strong>
          </div>

          <div className="settings-row">
            <span>Email</span>
            <strong>{user?.email}</strong>
          </div>

          <div className="settings-row">
            <span>Role</span>
            <strong className="badge">{user?.role}</strong>
          </div>
        </div>

        {/* SYSTEM CARD */}
        <div className="settings-card">
          <h3>System</h3>

          <div className="settings-row">
            <span>CRM Version</span>
            <strong>1.0</strong>
          </div>

          <div className="settings-row">
            <span>Status</span>
            <strong className="status-active">Active</strong>
          </div>
        </div>

        {/* SECURITY CARD */}
        <div className="settings-card">
          <h3>Security</h3>

          <p className="muted">
            Manage your account security settings
          </p>

          <button className="settings-btn" onClick={handleChangePassword}>
            Change Password
          </button>
        </div>

      </div>
    </MainLayout>
  );
}