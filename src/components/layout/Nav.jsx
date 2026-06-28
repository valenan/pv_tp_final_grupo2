import { Link, useLocation } from 'react-router-dom';
import { Container, Nav } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';

const NavApp = () => {
    const location = useLocation();
    const { admin } = useAuth();

    return (
        <Nav className="bg-secondary text-white py-2 mb-3 shadow-sm">
            <Container className="d-flex justify-content-start gap-2">
                <Nav.Link
                    as={Link}
                    to="/dashboard"
                    className={`text-white px-3 py-1 rounded ${
                        location.pathname === '/dashboard' ? 'bg-dark fw-bold' : ''
                    }`}
                >
                    Dashboard
                </Nav.Link>

                {admin ? (
                    <Nav.Link
                        as={Link}
                        to="/clientes"
                        className={`text-white px-3 py-1 rounded ${
                            location.pathname === '/clientes' ? 'bg-dark fw-bold' : ''
                        }`}
                    >
                        Lista de Clientes
                    </Nav.Link>
                ) : (
                    <Nav.Link
                        as={Link}
                        to="/login"
                        className={`text-white px-3 py-1 rounded ${
                            location.pathname === '/login' ? 'bg-dark fw-bold' : ''
                        }`}
                    >
                        Ingresar
                    </Nav.Link>
                )}
            </Container>
        </Nav>
    );
}

export default NavApp;