import api from './apiService';


// m38rmF$ contraseña johnd


let clientesCache = null;

const obtenerClientesDesdeCache = async () => {

if (clientesCache) {
    return [...clientesCache];
}

const { data } = await api.get('/users');

clientesCache = [...data];

return [...clientesCache];

};

const buscarUsuario = (texto, clientes) => {

const busqueda = texto.toLowerCase();

return clientes.filter(usuario =>
    usuario.name.lastname.toLowerCase().includes(busqueda) ||
    usuario.address.city.toLowerCase().includes(busqueda)
);

};

const obtenerClientes = async () => {

const clientes = await obtenerClientesDesdeCache();

return [...clientes];

};

const obtenerClientePorId = async (id) => {

const clientes = await obtenerClientesDesdeCache();

return clientes.find(
    cliente => cliente.id === parseInt(id)
);

};

const crearCliente = async (cliente) => {

const { data } = await api.post(
    '/users',
    cliente
);

if (clientesCache) {

    clientesCache = [
        data,
        ...clientesCache
    ];

}

return data;

};

const eliminarCliente = async (id) => {

const { data } = await api.delete(
    `/users/${id}`
);

if (clientesCache) {

    clientesCache = clientesCache.filter(
        cliente => cliente.id !== parseInt(id)
    );

}

return data;

};

const loginAdmin = async (username, password) => {

const clientes = await obtenerClientesDesdeCache();

const usuarioEncontrado = clientes.find(
    usuario =>
        usuario.username === username &&
        usuario.password === password
);

return usuarioEncontrado || null;

};

const clientesService = {
buscarUsuario,
obtenerClientes,
obtenerClientePorId,
crearCliente,
eliminarCliente,
loginAdmin
};

export default clientesService;