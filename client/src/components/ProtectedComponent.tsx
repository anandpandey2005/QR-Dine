import { Navigate, Outlet } from "react-router-dom";

interface ProtectedProps {
  isAuthenticated: {
    loggedIn: boolean;
  };
}

const ProtectedComponent = ({ isAuthenticated }: ProtectedProps) => {
 
  return isAuthenticated.loggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedComponent;