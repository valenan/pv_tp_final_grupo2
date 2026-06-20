import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { AdminContext } from '../context/AdminContext';

function Login() {

    const { login } = useContext(AdminContext);
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [sector, setSector] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (nombre.trim() === '' || sector === '') {
            setError('Debe completar el nombre y el sector.');
            return;
        }

        login({ nombre, sector });
        navigate('/clientes');
    };

    return (
        <Container style={{ maxWidth: '400px', marginTop: '50px' }}>
            <h2>Ingreso del Administrador</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre del Administrador</Form.Label>
                    <Form.Control
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Sector de la Empresa</Form.Label>
                    <Form.Select
                        value={sector}
                        onChange={(e) => setSector(e.target.value)}
                    >
                        <option value="">Seleccione...</option>
                        <option value="Soporte">Soporte</option>
                        <option value="Gerencia">Gerencia</option>
                    </Form.Select>
                </Form.Group>

                <Button type="submit">Ingresar</Button>
            </Form>
        </Container>
    );
}

export default Login;