import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // LOAD USER ON STARTUP
  // =========================
  useEffect(() => {
    const storedUser = localStorage.getItem("crm_user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        localStorage.removeItem("crm_user");
      }
    }

    setLoading(false);
  }, []);

  // =========================
  // LOGIN
  // =========================
  const loginUser = (userData) => {
    localStorage.setItem("crm_user", JSON.stringify(userData));
    setUser(userData);
  };

  // =========================
  // LOGOUT
  // =========================
  const logoutUser = () => {
    localStorage.removeItem("crm_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loginUser, logoutUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);