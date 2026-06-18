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
            <div className='buscador'>
            <Form>
            <Form.Control
            placeholder='Apellido o Lugar'
            value={busqueda}
            onChange={handleBusqueda}
            ></Form.Control>
            </Form>
            </div>
        {clientes.map(cliente => (
                <ClienteCard
                key= {cliente.id}
                cliente={cliente} />
        ))}
        </div>
    );
}

export default ListaClientes;