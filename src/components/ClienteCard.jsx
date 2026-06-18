import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DetalleClientes from '../views/DetalleClientes';

function ClienteCard({ cliente }) {
    const { id, nombre, apellido, email, telefono, direccion } = cliente;

    return (
    <Card className="mb-4 flex-fill">
        <Card.Body>
            <Card.Title>Cliente</Card.Title>
            <Card.Text>
                Nombre: {nombre} {apellido}
            </Card.Text>
            <Card.Text>Email: {email}</Card.Text>
            <Card.Text>Teléfono: {telefono}</Card.Text>
            <Card.Text>Dirección: {direccion}</Card.Text>
            <Button variant="primary">Más información</Button>
        </Card.Body>
    </Card>
);
}

export default ClienteCard;