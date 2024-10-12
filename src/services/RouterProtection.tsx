import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authContext";

export const RouterProtection = () => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};
