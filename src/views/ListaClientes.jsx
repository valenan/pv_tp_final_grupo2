import { useState } from 'react';
import clientesService from '../services/clientesService';
import ClienteCard from '../components/ClienteCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

function ListaClientes() {
    const [clientes, setClientes] = useState(
        clientesService.getClientes()
    );
    const [busqueda, setBusqueda] = useState("")
    const handleBusqueda = (e) =>{
        const texto = e.target.value;
        setBusqueda(texto);
        setClientes(clientesService.buscarUsuario(texto));
    };
    return (
        <div>
            <h1>Pagina de listado de Clientes</h1>
            <Form className='buscador'>
            <Form.Control
            placeholder='Apellido o Lugar'
            value={busqueda}
            onChange={handleBusqueda}
            ></Form.Control>
            </Form>
            <Container>
    <Row>
        {clientes.map(cliente => (
            <Col xs={12} sm={6} md={4} lg={4} xl={4} xxl={4} key={cliente.id}>
                <ClienteCard cliente={cliente} />
            </Col>
        ))}
    </Row>
</Container>
        </div>
    );
}

export default ListaClientes;