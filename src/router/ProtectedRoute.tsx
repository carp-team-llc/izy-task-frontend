import { Navigate } from 'react-router-dom';
import Layout from '../component/layout/Layout';

const ProtectedRoute = ({ isAuthenticated }: any) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Layout />;
};

export default ProtectedRoute;