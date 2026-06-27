import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';

const useAuth = () => {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error('useAuth debe usarse dentro de AdminProvider');
  }

  return context;
};

export default useAuth;