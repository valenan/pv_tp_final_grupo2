import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function ClienteCard({ cliente }) {
    const { id, name, email, phone, address } = cliente;

    return (
        <Card className="mb-4 flex-fill">
            <Card.Body>
                <Card.Title>Cliente</Card.Title>
                <Card.Text>ID: {id}</Card.Text>
                <Card.Text>
                    Nombre: {name.firstname} {name.lastname}
                </Card.Text>
                <Card.Text>Email: {email}</Card.Text>
                <Card.Text>Teléfono: {phone}</Card.Text>
                <Card.Text>Ciudad: {address.city}</Card.Text>
                <Button as={Link} to={`/clientes/${id}`} variant="primary">
                    Ver Ficha Completa
                </Button>
            </Card.Body>
        </Card>
    );
}

export default ClienteCard;