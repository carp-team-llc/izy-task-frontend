import { Navigate } from "react-router-dom";
import { useAuth } from "../services/authContext";

const RedirectIfLoggedIn = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to="/dashboard" replace /> : children;
};

export default RedirectIfLoggedIn;