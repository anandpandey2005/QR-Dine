import { Navigate, Outlet } from "react-router-dom";

interface ProtectedProps {
  isAuthenticated: {
    loggedIn: boolean;
  };
}

const ProtectedComponent = (props: ProtectedProps) => {
  return props.isAuthenticated.loggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedComponent;
