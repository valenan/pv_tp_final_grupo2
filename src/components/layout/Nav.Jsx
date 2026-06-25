import { Link, useLocation } from 'react-router-dom';
import { Container, Nav } from 'react-bootstrap';

function NavApp() {
    const location = useLocation();

    return (
        <Nav className="bg-secondary text-white py-2 mb-3 shadow-sm">
            <Container className="d-flex justify-content-start">
                <Nav.Link 
                    as={Link} 
                    to="/clientes" 
                    className={`text-white px-3 py-1 rounded ${
                        location.pathname === '/clientes' ? 'bg-dark fw-bold' : ''
                    }`}
                >
                    Lista de Clientes
                </Nav.Link>
            </Container>
        </Nav>
    );
}

export default NavApp;