import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const FormularioCliente = ({ inicial, onClienteCreado }) => {
    const [cliente, setCliente] = useState({
        email: "",
        username: "",
        password: "",
        name: {
            firstname: "",
            lastname: ""
        },
        address: {
            city: "",
            street: "",
            number: "",
            zipcode: ""
        },
        phone: ""
    });

    const [errores, setErrores] = useState({});

    useEffect(() => {
        if (inicial) {
            setCliente(inicial);
        }
    }, [inicial]);

    const validarEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validarFormulario = () => {
        const nuevosErrores = {};

        if (!cliente.name.firstname.trim()) nuevosErrores.firstname = "El nombre es requerido.";
        if (!cliente.name.lastname.trim()) nuevosErrores.lastname = "El apellido es requerido.";
        if (!cliente.username.trim()) nuevosErrores.username = "El nombre de usuario es requerido.";
        if (!cliente.password.trim()) nuevosErrores.password = "La contraseña es requerida.";
        if (!cliente.phone.trim()) nuevosErrores.phone = "El teléfono es requerido.";
        
        if (!cliente.email.trim()) {
            nuevosErrores.email = "El email es requerido.";
        } else if (!validarEmail(cliente.email)) {
            nuevosErrores.email = "El email no es válido.";
        }

        if (!cliente.address.city.trim()) nuevosErrores.city = "La ciudad es requerida.";
        if (!cliente.address.street.trim()) nuevosErrores.street = "La calle es requerida.";
        if (!cliente.address.number) nuevosErrores.number = "El número es requerido.";
        if (!cliente.address.zipcode.trim()) nuevosErrores.zipcode = "El código postal es requerido.";

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const manejarCambio = (e) => {
        const { name, value } = e.target;

        if (name.startsWith("name.")) {
            const campo = name.split(".")[1];
            setCliente((prev) => ({
                ...prev,
                name: { ...prev.name, [campo]: value }
            }));
        } else if (name.startsWith("address.")) {
            const campo = name.split(".")[1];
            setCliente((prev) => ({
                ...prev,
                address: { 
                    ...prev.address, 
                    [campo]: campo === "number" ? (parseInt(value) || "") : value 
                }
            }));
        } else {
            setCliente((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validarFormulario()) return;

        try {
            const response = await fetch('https://fakestoreapi.com/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cliente)
            });

            if (!response.ok) throw new Error('Error al registrar el cliente en el servidor');

            const data = await response.json();

            const clienteCompleto = {
                ...cliente,
                id: data.id
            };

            if (onClienteCreado) {
                onClienteCreado(clienteCompleto);
            }

            setCliente({
                email: "", username: "", password: "",
                name: { firstname: "", lastname: "" },
                address: { city: "", street: "", number: "", zipcode: "" },
                phone: ""
            });
            setErrores({});
            alert(`¡Cliente creado con éxito! ID asignado: ${data.id}`);

        } catch (error) {
            alert(`Hubo un error: ${error.message}`);
        }
    };

    return (
        <div className="p-4 mb-4 border rounded bg-light">
            <h4 className="mb-3">Alta de Nuevo Cliente (Estructura Unificada)</h4>
            <Form onSubmit={handleSubmit}>
                
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                name="name.firstname"
                                value={cliente.name.firstname}
                                onChange={manejarCambio}
                                placeholder="Juan"
                                isInvalid={!!errores.firstname}
                            />
                            <Form.Control.Feedback type="invalid">{errores.firstname}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                name="name.lastname"
                                value={cliente.name.lastname}
                                onChange={manejarCambio}
                                placeholder="Pérez"
                                isInvalid={!!errores.lastname}
                            />
                            <Form.Control.Feedback type="invalid">{errores.lastname}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                name="email"
                                type="email"
                                value={cliente.email}
                                onChange={manejarCambio}
                                placeholder="juan@ejemplo.com"
                                isInvalid={!!errores.email}
                            />
                            <Form.Control.Feedback type="invalid">{errores.email}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                name="phone"
                                value={cliente.phone}
                                onChange={manejarCambio}
                                placeholder="388-1234567"
                                isInvalid={!!errores.phone}
                            />
                            <Form.Control.Feedback type="invalid">{errores.phone}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                name="username"
                                value={cliente.username}
                                onChange={manejarCambio}
                                placeholder="juan.perez"
                                isInvalid={!!errores.username}
                            />
                            <Form.Control.Feedback type="invalid">{errores.username}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Ciudad</Form.Label>
                            <Form.Control
                                name="address.city"
                                value={cliente.address.city}
                                onChange={manejarCambio}
                                placeholder="San Salvador de Jujuy"
                                isInvalid={!!errores.city}
                            />
                            <Form.Control.Feedback type="invalid">{errores.city}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Calle</Form.Label>
                            <Form.Control
                                name="address.street"
                                value={cliente.address.street}
                                onChange={manejarCambio}
                                placeholder="Av. Fascio"
                                isInvalid={!!errores.street}
                            />
                            <Form.Control.Feedback type="invalid">{errores.street}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group className="mb-3">
                            <Form.Label>Número</Form.Label>
                            <Form.Control
                                name="address.number"
                                type="number"
                                value={cliente.address.number}
                                onChange={manejarCambio}
                                placeholder="840"
                                isInvalid={!!errores.number}
                            />
                            <Form.Control.Feedback type="invalid">{errores.number}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Código Postal</Form.Label>
                            <Form.Control
                                name="address.zipcode"
                                value={cliente.address.zipcode}
                                onChange={manejarCambio}
                                placeholder="4600"
                                isInvalid={!!errores.zipcode}
                            />
                            <Form.Control.Feedback type="invalid">{errores.zipcode}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>Contraseña de acceso</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        value={cliente.password}
                        onChange={manejarCambio}
                        placeholder="••••••••"
                        isInvalid={!!errores.password}
                    />
                    <Form.Group><Form.Control.Feedback type="invalid">{errores.password}</Form.Control.Feedback></Form.Group>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-2">
                    Guardar Cliente
                </Button>
            </Form>
        </div>
    );
};

export default FormularioCliente;
