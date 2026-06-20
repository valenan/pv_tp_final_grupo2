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

    useEffect(() => {
        fetch(`https://fakestoreapi.com/users/${id}`)
            .then(res => res.json())
            .then(data => setCliente(data));
    }, [id]);
    const eliminarCliente = async () => {
        try {
            await fetch(
                `https://fakestoreapi.com/users/${id}`,
                {
                    method: "DELETE"
                }
            );
            alert("Cliente eliminado");
        } catch (error) {
            console.error(error);
        }
    };
    if (!cliente) {
        return <h2>Cargando...</h2>;
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
                        {cliente.name.firstname}
                        {" "}
                        {cliente.name.lastname}
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
                        Calle:
                        {" "}
                        {cliente.address.street}
                    </p>
                    <p>
                        Número:
                        {" "}
                        {cliente.address.number}
                    </p>
                    <p>
                        Código Postal:
                        {" "}
                        {cliente.address.zipcode}
                    </p>
                    <p>
                        Ciudad:
                        {" "}
                        {cliente.address.city}
                    </p>
                    <hr />
                    <h5>Credenciales</h5>
                    <p>
                        Usuario:
                        {" "}
                        {cliente.username}
                    </p>
                    <p>
                        Contraseña:
                        {" "}
                        {cliente.password}
                    </p>
                    {
                        admin?.sector === "Gerencia"
                        &&
                        <Alert variant="danger">
                            <p>
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