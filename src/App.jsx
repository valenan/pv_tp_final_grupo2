import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext';
import Header from './components/layout/Header';
import RutaProtegida from './components/common/RutaProtegida';
import Login from './views/Login';
import ListaClientes from './views/ListaClientes';
import DetalleClientes from './views/DetalleClientes';

function App() {
  return (
    <AdminProvider>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/clientes"
          element={
            <RutaProtegida>
              <ListaClientes />
            </RutaProtegida>
          }
        />

        <Route
          path="/clientes/:id"
          element={
            <RutaProtegida>
              <DetalleClientes />
            </RutaProtegida>
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AdminProvider>
  );
}

export default App