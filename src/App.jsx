import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext';
import Header from './components/layout/Header';
import NavApp from './components/layout/Nav'; 
import Footer from './components/layout/Footer'; 
import RutaProtegida from './components/common/RutaProtegida';
import Login from './views/Login';
import ListaClientes from './views/ListaClientes';
import DetalleClientes from './views/DetalleClientes';

function App() {
  return (
    <AdminProvider>
      <div className="d-flex flex-column min-vh-100">
        
      
        <Header />
        <NavApp />

        <main className="flex-grow-1">
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
        </main>

        
        <Footer />

      </div>
    </AdminProvider>
  );
}

export default App;