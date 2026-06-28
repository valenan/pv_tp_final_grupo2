import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import clientesService from '../services/clientesService';
import adminService from '../services/adminservice';

const Dashboard = () => {
    const [clientes, setClientes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    const admins = adminService.obtenerAdmins();
    const gerencia = admins.filter(a => a.sector === 'Gerencia').length;
    const soporte = admins.filter(a => a.sector === 'Soporte').length;

    useEffect(() => {
        const cargar = async () => {
            try {
                setCargando(true);
                const data = await clientesService.obtenerClientes();
                setClientes(data);
            } catch (err) {
                setError(err.message || 'No se pudieron cargar los datos.');
            } finally {
                setCargando(false);
            }
        };
        cargar();
    }, []);

    const ciudades = (Array.isArray(clientes) ? clientes : []).reduce((acc, cliente) => {
        const ciudad = cliente?.address?.city?.trim() || 'Sin ciudad';
        const clave = ciudad.toLowerCase();
        acc[clave] = (acc[clave] || 0) + 1;
        return acc;
    }, {});

    if (cargando) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-4">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <h2 className="mb-4">Dashboard</h2>

            <Row className="mb-4 g-3">
                <Col xs={12} sm={6} md={3}>
                    <Card className="text-center h-100">
                        <Card.Body>
                            <Card.Title>Administradores</Card.Title>
                            <Card.Text style={{ fontSize: '2rem' }}>
                                {admins.length}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} sm={6} md={3}>
                    <Card className="text-center h-100">
                        <Card.Body>
                            <Card.Title>Gerencia</Card.Title>
                            <Card.Text style={{ fontSize: '2rem' }}>
                                {gerencia}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} sm={6} md={3}>
                    <Card className="text-center h-100">
                        <Card.Body>
                            <Card.Title>Soporte</Card.Title>
                            <Card.Text style={{ fontSize: '2rem' }}>
                                {soporte}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} sm={6} md={3}>
                    <Card className="text-center h-100">
                        <Card.Body>
                            <Card.Title>Clientes</Card.Title>
                            <Card.Text style={{ fontSize: '2rem' }}>
                                {clientes.length}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <h5 className="mb-3">Clientes por ciudad</h5>
            <Row className="g-3">
                {Object.entries(ciudades).map(([ciudad, cantidad]) => (
                    <Col xs={12} sm={6} md={4} key={ciudad}>
                        <Card className="h-100">
                            <Card.Body className="d-flex justify-content-between align-items-center">
                                <span className="text-capitalize">{ciudad}</span>
                                <span className="badge bg-secondary fs-6">{cantidad}</span>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Dashboard;