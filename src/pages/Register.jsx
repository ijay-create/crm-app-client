import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";

import API from "../api/axios";

import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();

  const { loginUser } = useAuth();

  const [formData, setFormData] =
    useState({
      fullName: "",
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } =
        await API.post(
          "/auth/register",
          formData
        );

      loginUser(data);

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start managing customers smarter."
    >
      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label>Full Name</label>

          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Create password"
            onChange={handleChange}
            required
          />
        </div>

        <button
          className="auth-btn"
          disabled={loading}
        >
          {loading
            ? "Creating..."
            : "Create Account"}
        </button>

        <p className="auth-switch">
          Already have an account?
          <Link to="/login">
            {" "}
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;