import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { AdminContext } from '../../context/AdminContext';

const Header = () => {

    const { admin, logout } = useContext(AdminContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="bg-dark text-white p-3">
            <Container className="d-flex justify-content-between align-items-center">
                <Link to="/clientes" className="text-white text-decoration-none">
                    Panel de Control de Clientes
                </Link>

                {admin && (
                    <div>
                        <span className="me-3">
                {admin.nombre} - {admin.sector}
</span>
                        <Button variant="outline-light" size="sm" onClick={handleLogout}>
                            Cerrar Sesión
                        </Button>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Header;