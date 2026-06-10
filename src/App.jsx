import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Customers from "./pages/Customers";
import Leads from "./pages/Leads";
import Tasks from "./pages/Tasks";
import Settings from "./pages/Settings";
import LeadPipeline from "./pages/LeadPipeline";
import AI from "./pages/AI";
import UserManagement from "./pages/UserManagement";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleGuard from "./components/RoleGuard";
import AIFloatingButton from "./components/AIFloatingButton";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import SuperAdminPanel from "./pages/SuperAdminPanel";

function App() {
  return (
    <>
      {/* ROUTES */}
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/super-admin" element={<SuperAdminDashboard />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads"
          element={
            <ProtectedRoute>
              <Leads />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lead-pipeline"
          element={
            <ProtectedRoute>
              <LeadPipeline />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />

        {/* AI PAGE */}
        <Route
          path="/ai"
          element={
            <ProtectedRoute>
              <AI />
            </ProtectedRoute>
          }
        />

        {/* SETTINGS (SUPER ADMIN ONLY) */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <RoleGuard roles={["super_admin"]}>
                <Settings />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route path="/super-admin-panel" element={
          <ProtectedRoute role="super_admin">
            <SuperAdminPanel />
          </ProtectedRoute>
        } />

      </Routes>

      {/* GLOBAL FLOATING AI (🔥 IMPORTANT PART) */}
      <AIFloatingButton />
    </>
  );
}

export default App;