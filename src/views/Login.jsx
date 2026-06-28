import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, InputGroup } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';
import clientesService from '../services/clientesService';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dashboard from '../components/common/Dashboard';

const Login = () => {

    const { login } = useAuth();
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [errores, setErrores] = useState({});

    const handleSubmit = async (e) => {

        e.preventDefault();
        const nuevosErrores = {};
        if (usuario.trim() === '') {
            nuevosErrores.usuario =
                'Debe completar el usuario.';
        }
        if (password.trim() === '') {
            nuevosErrores.password =
                'Debe completar la contraseña.';
        }
        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }
        try {
            const adminEncontrado =
                await clientesService.loginAdmin(
                    usuario,
                    password
                );
            if (!adminEncontrado) {
                setErrores({
                    general:
                        'Usuario o contraseña incorrectos'
                });
                return;
            }
            login(adminEncontrado);
            navigate('/clientes');
        } catch (error) {
            console.error(error);
            setErrores({
                general:
                    'Error al iniciar sesión'
            });
        }
    };
    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Row>
                <Col>
            <Card style={{ width: '26rem' }}>
                <Card.Body>
                    <Card.Title>
                        Ingreso del Administrador
                    </Card.Title>
                    {
                        errores.general &&
                        <p style={{ color: 'red' }}>
                            {errores.general}
                        </p>
                    }
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Usuario
                            </Form.Label>
                            <Form.Control
                                type="text"
                                value={usuario}
                                onChange={(e) => {
                                    setUsuario(e.target.value);
                                    setErrores(prev => ({
                                        ...prev,
                                        usuario: undefined,
                                        general: undefined
                                    }));
                                }}
                                placeholder="Ej: johnd"
                                isInvalid={!!errores.usuario}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errores.usuario}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Contraseña
                            </Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type={
                                        mostrarPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setErrores(prev => ({
                                            ...prev,
                                            password: undefined,
                                            general: undefined
                                        }));
                                    }}
                                    placeholder="Ingrese su contraseña"
                                    isInvalid={!!errores.password}
                                />
                                <InputGroup.Text
                                    as="button"
                                    type="button"
                                    onClick={() =>
                                        setMostrarPassword(
                                            prev => !prev
                                        )
                                    }
                                    tabIndex={-1}
                                    style={{
                                        cursor: 'pointer',
                                        borderColor: '#ced4da',
                                        backgroundColor: '#f8f9fa'
                                    }}
                                >
                                    {mostrarPassword ? '🙈' : '👁️'}
                                </InputGroup.Text>
                                <Form.Control.Feedback type="invalid">
                                    {errores.password}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-100"
                        >
                            Ingresar
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            </Col>
            <Col>
            <Dashboard/>
            </Col>
            </Row>
        </Container>
    );
};

export default Login;