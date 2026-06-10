import { useAuth } from "../context/AuthContext";

const RoleGuard = ({ roles, children }) => {
  const { user } = useAuth();

  if (!roles.includes(user?.role)) {
    return (
      <h2 style={{ padding: 20 }}>
        Access Denied
      </h2>
    );
  }

  return children;
};

export default RoleGuard;