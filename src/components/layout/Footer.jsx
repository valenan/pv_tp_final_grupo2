import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
    return (
        <footer className="bg-dark text-white mt-auto py-3 border-top border-secondary">
            <Container>
                <Row className="align-items-center text-center text-md-start">
                    <Col md={6} className="mb-2 mb-md-0">
                        <span className="text-muted">© 2026 - Trabajo Práctico Integrador</span>
                        <p className="mb-0 fw-bold text-light">Programación Visual - UNJu</p>
                    </Col>
                    <Col md={6} className="text-center text-md-end">
                        <span className="text-muted d-block small">Desarrollado por Grupo N° X</span>
                        <span className="text-light small">Integrantes: Guanactolay Franco, Angulo Valentin, Chosco Fabricio y Colque Inti</span>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;