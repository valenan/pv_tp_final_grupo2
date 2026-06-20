const URL_BASE = 'https://fakestoreapi.com/users';

const buscarUsuario = (texto, clientes) => {
    const busqueda = texto.toLowerCase();

    return clientes.filter(usuario =>
        usuario.name.lastname.toLowerCase().includes(busqueda) ||
        usuario.address.city.toLowerCase().includes(busqueda)
    );
};

async function obtenerClientes() {
    const res = await fetch(URL_BASE);
    if (!res.ok) {
        throw new Error('No se pudo obtener la lista de clientes');
    }
    return res.json();
}

async function obtenerClientePorId(id) {
    const res = await fetch(`${URL_BASE}/${id}`);
    if (!res.ok) {
        throw new Error('No se pudo obtener el cliente');
    }
    return res.json();
}

async function crearCliente(cliente) {
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

async function eliminarCliente(id) {
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