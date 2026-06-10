import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

import "../styles/sidebar.css";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const navigate = useNavigate();
  const { logoutUser, user } = useAuth();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const isSuperAdmin = user?.role === "super_admin";

  return (
    <>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="sidebar-overlay"
            onClick={closeSidebar}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={`sidebar ${sidebarOpen ? "open" : ""}`}
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -320 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 26,
        }}
      >
        <div className="sidebar-top">
          <h2>FlowCRM</h2>
        </div>

        <nav className="sidebar-links">
          <NavLink to="/" onClick={closeSidebar}>
            Dashboard
          </NavLink>

          <NavLink to="/customers" onClick={closeSidebar}>
            Customers
          </NavLink>

          <NavLink to="/leads" onClick={closeSidebar}>
            Leads
          </NavLink>

          <NavLink to="/tasks" onClick={closeSidebar}>
            Tasks
          </NavLink>

          {/* =========================
              SUPER ADMIN SECTION
          ========================= */}
          {isSuperAdmin && (
            <>
              <div className="sidebar-divider" />

              <NavLink to="/super-admin" onClick={closeSidebar}>
                Admin Panel
              </NavLink>

              <NavLink to="/users" onClick={closeSidebar}>
                User Management
              </NavLink>
            </>
          )}

          <NavLink to="/settings" onClick={closeSidebar}>
            Settings
          </NavLink>
        </nav>

        <div className="sidebar-bottom">
          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;