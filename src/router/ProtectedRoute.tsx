import { Navigate } from "react-router-dom";
import Layout from "../component/layout/Layout";
import { useAuth } from "../services/authContext";
import Skeleton from "../component/common/skeleton";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="space-y-4 w-80">
          <Skeleton className="h-6 w-2/3 mx-auto" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-1/2 mx-auto" />
          <Skeleton className="h-10 w-full mx-auto mt-6" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Layout />;
};

export default ProtectedRoute;
