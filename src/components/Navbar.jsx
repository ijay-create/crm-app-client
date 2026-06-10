import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

const Navbar = ({ setSidebarOpen, search, setSearch }) => {
  const { user } = useAuth();
  const [localSearch, setLocalSearch] = useState(search || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(localSearch);
    }, 300); // 🔥 debounce delay

    return () => clearTimeout(timer);
  }, [localSearch]);

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <header className="navbar">
      <button
        className="menu-btn"
        onClick={() => setSidebarOpen(true)}
      >
        ☰
      </button>

      <div className="navbar-right">
        <input
          type="text"
          placeholder="Search customers, leads..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />

        <div className="profile">
          {user?.fullName ? getInitials(user.fullName) : "U"}
        </div>
      </div>
    </header>
  );
};

export default Navbar;