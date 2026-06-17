import clientesService from '../services/clientesService';
import ClienteCard from '../components/ClienteCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';

function ListaClientes() {
    const clientes = clientesService().getClientes();

    return (
        <Container fluid>
            <Row className="g-4" xs={1} md={3}>
                {clientes.map(cliente => (
                    <Col key={cliente.id}>
                        <ClienteCard cliente={cliente} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default ListaClientes;