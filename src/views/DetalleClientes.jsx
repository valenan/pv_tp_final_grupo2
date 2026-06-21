import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

function DetalleClientes() {
    
    const { id } = useParams();
    const { admin } = useContext(AdminContext);
    const [cliente, setCliente] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const obtenerDetalle = async () => {
            try {
                setError("");
                
                const clientesLocales = localStorage.getItem('lista_clientes');
                let clienteEncontrado = null;

                if (clientesLocales) {
                    const lista = JSON.parse(clientesLocales);
                    // Buscamos si el ID de la URL coincide con alguno de la lista local
                    clienteEncontrado = lista.find(c => c.id === parseInt(id));
                }

                if (clienteEncontrado) {
                    setCliente(clienteEncontrado);
                } else {
                    // Si no está en LocalStorage, recurrimos de forma asrincrónica a la API
                    const response = await fetch(`https://fakestoreapi.com/users/${id}`);
                    if (!response.ok) {
                        throw new Error("No se pudo obtener la información del servidor remoto.");
                    }
                    const data = await response.json();
                    setCliente(data);
                }
            } catch (err) {
                console.error(err);
                setError(err.message);
            }
        };

        obtenerDetalle();
    }, [id]);

    const eliminarCliente = async () => {
        try {
            await fetch(
                `https://fakestoreapi.com/users/${id}`,
                {
                    method: "DELETE"
                }
            );

            const clientesLocales = localStorage.getItem('lista_clientes');
            if (clientesLocales) {
                const lista = JSON.parse(clientesLocales);
                const listaFiltrada = lista.filter(c => c.id !== parseInt(id));
                localStorage.setItem('lista_clientes', JSON.stringify(listaFiltrada));
            }

            alert("Cliente eliminado de forma simulada");
        } catch (error) {
            console.error(error);
        }
    };

    if (error) {
        return (
            <Container className="mt-4">
                <Alert variant="danger">Hubo un error al cargar la ficha: {error}</Alert>
            </Container>
        );
    }

    if (!cliente) {
        return (
            <Container className="text-center mt-5">
                <h2>Cargando...</h2>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <Card>
                <Card.Body>
                    <Card.Title>
                        Ficha Completa del Cliente
                    </Card.Title>
                    <p>
                        <strong>ID:</strong> {cliente.id}
                    </p>
                    <p>
                        <strong>Nombre:</strong>
                        {" "}
                        {cliente.name?.firstname}
                        {" "}
                        {cliente.name?.lastname}
                    </p>
                    <p>
                        <strong>Email:</strong>
                        {" "}
                        {cliente.email}
                    </p>
                    <p>
                        <strong>Teléfono:</strong>
                        {" "}
                        {cliente.phone}
                    </p>
                    <hr />
                    <h5>Dirección</h5>
                    <p>
                        <strong>Calle:</strong>
                        {" "}
                        {cliente.address?.street}
                    </p>
                    <p>
                        <strong>Número:</strong>
                        {" "}
                        {cliente.address?.number}
                    </p>
                    <p>
                        <strong>Código Postal:</strong>
                        {" "}
                        {cliente.address?.zipcode}
                    </p>
                    <p>
                        <strong>Ciudad:</strong>
                        {" "}
                        {cliente.address?.city}
                    </p>
                    <hr />
                    <h5>Credenciales</h5>
                    <p>
                        <strong>Usuario:</strong>
                        {" "}
                        {cliente.username}
                    </p>
                    <p>
                        <strong>Contraseña:</strong>
                        {" "}
                        {cliente.password}
                    </p>
                    {
                        admin?.sector === "Gerencia"
                        &&
                        <Alert variant="danger" className="mt-4">
                            <p className="fw-bold">
                                Permisos de Gerencia habilitados
                            </p>
                            <Button
                                variant="danger"
                                onClick={eliminarCliente}
                            >
                                Eliminar Cliente
                            </Button>
                        </Alert>
                    }
                </Card.Body>
            </Card>
        </Container>
    );
}
	
export default DetalleClientes;
