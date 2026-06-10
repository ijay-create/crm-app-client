import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Toast from "../components/Notifications/Toast";

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 🔥 GLOBAL SEARCH STATE
  const [search, setSearch] = useState("");

  return (
    <>
      <Toast />

      <div className="layout">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="main-content">
          {/* 🔥 PASS SEARCH TO NAVBAR */}
          <Navbar
            setSidebarOpen={setSidebarOpen}
            search={search}
            setSearch={setSearch}
          />

          <div className="page-content">
            {/* 🔥 PASS SEARCH TO ALL PAGES */}
            {typeof children === "function"
              ? children(search)
              : children}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;