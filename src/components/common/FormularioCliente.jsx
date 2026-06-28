import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";

const FormularioCliente = ({ inicial, onSubmit }) => {
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

    const soloNumeros = (valor) => {
        return valor.replace(/[^0-9]/g, "");
    };

    const soloLetras = (valor) => {
        return valor.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, "").replace(/\s{2,}/g, " ");
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
        if (!cliente.address.number.trim()) nuevosErrores.number = "El número es requerido.";
        if (!cliente.address.zipcode.trim()) nuevosErrores.zipcode = "El código postal es requerido.";

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        let valorFinal = value;

        if (name === "phone" || name === "address.zipcode" || name === "address.number") {
            valorFinal = soloNumeros(value);
        } else if (name === "name.firstname" || name === "name.lastname" || name === "address.city") {
            valorFinal = soloLetras(value);
        }

        if (name.startsWith("name.")) {
            const campo = name.split(".")[1];
            setCliente((prev) => ({
                ...prev,
                name: { ...prev.name, [campo]: valorFinal }
            }));
        } else if (name.startsWith("address.")) {
            const campo = name.split(".")[1];
            setCliente((prev) => ({
                ...prev,
                address: { ...prev.address, [campo]: valorFinal }
            }));
        } else {
            setCliente((prev) => ({
                ...prev,
                [name]: valorFinal
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validarFormulario()) {
            onSubmit(cliente);
        }
    };

    return (
        <Form onSubmit={handleSubmit} noValidate>
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
                        {errores.firstname && (
                            <Form.Control.Feedback type="invalid" className="d-block">
                                {errores.firstname}
                            </Form.Control.Feedback>
                        )}
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
                        {errores.lastname && (
                            <Form.Control.Feedback type="invalid" className="d-block">
                                {errores.lastname}
                            </Form.Control.Feedback>
                        )}
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
                        {errores.email && (
                            <Form.Control.Feedback type="invalid" className="d-block">
                                {errores.email}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="formTelefono" className="mb-3">
                        <Form.Label>Teléfono</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text className="bg-light border-end-0 text-muted fw-medium">+</InputGroup.Text>
                            <Form.Control
                                className="border-start-0 ps-1"
                                name="phone"
                                value={cliente.phone}
                                onChange={manejarCambio}
                                placeholder="3881234567"
                                isInvalid={!!errores.phone}
                            />
                        </InputGroup>
                        {errores.phone && (
                            <Form.Control.Feedback type="invalid" className="d-block">
                                {errores.phone}
                            </Form.Control.Feedback>
                        )}
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
                        {errores.username && (
                            <Form.Control.Feedback type="invalid" className="d-block">
                                {errores.username}
                            </Form.Control.Feedback>
                        )}
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
                        {errores.city && (
                            <Form.Control.Feedback type="invalid" className="d-block">
                                {errores.city}
                            </Form.Control.Feedback>
                        )}
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
                        {errores.street && (
                            <Form.Control.Feedback type="invalid" className="d-block">
                                {errores.street}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Form.Group className="mb-3">
                        <Form.Label>Número</Form.Label>
                        <Form.Control
                            name="address.number"
                            value={cliente.address.number}
                            onChange={manejarCambio}
                            placeholder="840"
                            isInvalid={!!errores.number}
                        />
                        {errores.number && (
                            <Form.Control.Feedback type="invalid" className="d-block">
                                {errores.number}
                            </Form.Control.Feedback>
                        )}
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
                        {errores.zipcode && (
                            <Form.Control.Feedback type="invalid" className="d-block">
                                {errores.zipcode}
                            </Form.Control.Feedback>
                        )}
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
                {errores.password && (
                    <Form.Control.Feedback type="invalid" className="d-block">
                        {errores.password}
                    </Form.Control.Feedback>
                )}
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-2">
                Guardar Cliente
            </Button>
        </Form>
    );
};

export default FormularioCliente;