import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';
import ListaClientes from '../views/ListaClientes';
import DetalleClientes from '../views/DetalleClientes';
import RutaProtegida from '../components/common/RutaProtegida';

export const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/dashboard',
    element: <App page={<Dashboard />} />,
  },
  {
    path: '/login',
    element: <App page={<Login />} />,
  },
  {
    path: '/clientes',
    element: <App page={<RutaProtegida><ListaClientes /></RutaProtegida>} />,
  },
  {
    path: '/clientes/:id',
    element: <App page={<RutaProtegida><DetalleClientes /></RutaProtegida>} />,
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);