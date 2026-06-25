const URL_BASE = 'https://fakestoreapi.com/users';

const buscarUsuario = (texto, clientes) => {
    const busqueda = texto.toLowerCase();

    return clientes.filter(usuario =>
        usuario.name.lastname.toLowerCase().includes(busqueda) ||
        usuario.address.city.toLowerCase().includes(busqueda)
    );
};

const obtenerClientes = async () => {
    const res = await fetch(URL_BASE);
    if (!res.ok) {
        throw new Error('No se pudo obtener la lista de clientes');
    }
    return res.json();
}

const obtenerClientePorId = async (id) => {
    const res = await fetch(`${URL_BASE}/${id}`);
    if (!res.ok) {
        throw new Error('No se pudo obtener el cliente');
    }
    return res.json();
}

const crearCliente = async (cliente) => {
    const res = await fetch(URL_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
    });
    if (!res.ok) {
        throw new Error('No se pudo crear el cliente');
    }
    return res.json();
}

const eliminarCliente = async (id) => {
    const res = await fetch(`${URL_BASE}/${id}`, {
        method: 'DELETE'
    });
    if (!res.ok) {
        throw new Error('No se pudo eliminar el cliente');
    }
    return res.json();
}

const clientesService = {
    buscarUsuario,
    obtenerClientes,
    obtenerClientePorId,
    crearCliente,
    eliminarCliente
};

export default clientesService;