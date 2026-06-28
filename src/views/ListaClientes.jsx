import { useState, useEffect } from 'react';
import clientesService from '../services/clientesService';
import ClienteCard from '../components/common/ClienteCard';
import FormularioCliente from '../components/common/FormularioCliente';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import '../assets/styles/listaClientes.css'

const ListaClientes = () => {

    const [allClientes, setAllClientes] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const cargarClientes = async () => {

            try {
                setCargando(true);
                setError("");

                const clientesLocales = localStorage.getItem('lista_clientes');

                if (clientesLocales) {
                    const datosParseados = JSON.parse(clientesLocales);
                    setAllClientes(datosParseados);
                    setClientes(datosParseados);
                } else {

                    const data = await clientesService.obtenerClientes();           
                    

                    setAllClientes(data);
                    setClientes(data);
                    localStorage.setItem('lista_clientes', JSON.stringify(data));
                    
                }

            } catch (err) {

                setError(err.message);

            } finally {

                setCargando(false);

            }
        };

        cargarClientes();

    }, []);

   const agregarNuevoCliente = async (cliente) => {
    try {
        setError("");

        const clienteCreado = await clientesService.crearCliente(cliente);

        const nuevoCliente = {
            ...cliente,
            id: clienteCreado.id || Date.now()
        };

        const listaActualizada = [nuevoCliente, ...allClientes];

        setAllClientes(listaActualizada);
        setClientes(listaActualizada);
        localStorage.setItem('lista_clientes', JSON.stringify(listaActualizada));
    } catch (err) {
        setError(err.message);
    }
};


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
                    <span className="visually-hidden">Cargando...</span>

                </Spinner>
            </div>
        );
    }

    return (
        <div>
            <Container className="mt-4">
                <h1>Página de listado de Clientes</h1>

                <Row className="mb-4">
                    <Col xs={12}>
                    <FormularioCliente onSubmit={agregarNuevoCliente} />                                </Col>
                </Row>

                <hr />

                <h3 className="mt-4 mb-3">Buscar y Filtrar</h3>
                <Form className='buscador mb-4'>
                    <Form.Control
                        placeholder='Apellido o Lugar'
                        value={busqueda}
                        onChange={handleBusqueda}
                    />
                </Form>
                {error && (
                    <Alert variant="danger" className="mb-4">
                        {error}
                    </Alert>
                )}

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
