import { Navigate } from "react-router-dom";
import Layout from "../component/layout/Layout";
import { useAuth } from "../services/authContext";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Layout />;
};

export default ProtectedRoute;
