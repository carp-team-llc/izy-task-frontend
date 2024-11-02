import { Navigate } from 'react-router-dom';
import Layout from '../component/layout/Layout';

const ProtectedRoute = ({ isAuthenticated }: any) => {
  console.log("isAuthenticated: ", JSON.stringify(isAuthenticated, null, 2));
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Layout />;
};

export default ProtectedRoute;