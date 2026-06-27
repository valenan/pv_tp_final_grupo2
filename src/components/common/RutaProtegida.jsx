import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RutaProtegida = ({ children }) => {
  const { admin } = useAuth();

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RutaProtegida;