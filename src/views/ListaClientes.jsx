import { useState, useEffect } from 'react';
import clientesService from '../services/clientesService';
import ClienteCard from '../components/common/ClienteCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

function ListaClientes() {


    const [allClientes, setAllClientes] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [cargando, setCargando] = useState (true);
    const [error, setError] = useState ("");

    useEffect(() => {

        const cargarClientes = async () => {

            try {
                setCargando(true);
                setError("");

                const response = await fetch('https://fakestoreapi.com/users');

                if (!response.ok) {
                    throw new Error("Error al obtener los clientes");
                }

                const data = await response.json();

                setAllClientes(data);
                setClientes(data);

            } catch (err) {

                setError(err.message);

            } finally {

                setCargando(false);

            }
        };

        cargarClientes();

    }, []);

    const [busqueda, setBusqueda] = useState("");
    const handleBusqueda = (e) => {
        const texto = e.target.value;
        setBusqueda(texto);
        if (!texto) {
            setClientes(allClientes);
            return;
        }
        setClientes(clientesService.buscarUsuario(texto, allClientes));
    };
    if (cargando) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">
                        Cargando...
                    </span>
                </Spinner>
            </div>
        );
    }

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
            {error && (
    <Alert variant="danger" className="m-3">
        {error}
    </Alert>
)}
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