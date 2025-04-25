import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authContext";

export const RouterProtection = () => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};
