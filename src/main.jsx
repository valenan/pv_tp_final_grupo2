import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AdminProvider } from './context/AdminContext';
import { AppRouter } from './routes/AppRouter';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminProvider>
      <RouterProvider router={AppRouter} />
    </AdminProvider>
  </StrictMode>,
);