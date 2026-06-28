import { AdminProvider } from './context/AdminContext';
import Header from './components/layout/Header';
import NavApp from './components/layout/Nav';
import Footer from './components/layout/Footer';

const App = ({ page }) => {
  return (
    <AdminProvider>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <NavApp />
        <main className="flex-grow-1">
          {page}
        </main>
        <Footer />
      </div>
    </AdminProvider>
  );
};

export default App;