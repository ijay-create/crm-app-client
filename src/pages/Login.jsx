import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // =========================
  // SUBMIT LOGIN
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

    const { data } = await API.post("/auth/login", formData);

      console.log("🔥 LOGIN RESPONSE:", data);

      // 🔥 normalize user before saving
     const userData = {
        id: data.user.id,
        fullName: data.user.fullName,
        email: data.user.email,
        role: data.user.role,
        companyId: data.user.companyId,
        isActive: data.user.isActive,
        token: data.accessToken,
      };

      console.log("🔥 USER TO SAVE:", userData);

      loginUser(userData);

      console.log(
        "🔥 LOCAL STORAGE:",
        localStorage.getItem("crm_user")
      );
      loginUser(userData); // saves to context + localStorage

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login failed:", error);

      alert(
        error?.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to continue managing your CRM."
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        {/* EMAIL */}
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* PASSWORD */}
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* BUTTON */}
        <button className="auth-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* SWITCH */}
        <p className="auth-switch">
          Don’t have an account?{" "}
          <Link to="/register">Register</Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;