import clientesService from '../services/clientesService';
import ClienteCard from '../components/ClienteCard';

function ListaClientes() {

    const clientes = clientesService().getClientes();

return (
    <div>
        {clientes.map(cliente => (
            <ClienteCard key={cliente.id} cliente={cliente} />
        ))}
    </div>
)
}
export default ListaClientes;