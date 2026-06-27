import api from './apiService';

const buscarUsuario = (texto, clientes) => {

    const busqueda = texto.toLowerCase();

    return clientes.filter(usuario =>
        usuario.name.lastname.toLowerCase().includes(busqueda) ||
        usuario.address.city.toLowerCase().includes(busqueda)
    );

};

const obtenerClientes = async () => {

    const { data } = await api.get('/users');

    return data;

};

const obtenerClientePorId = async (id) => {

    const { data } = await api.get(`/users/${id}`);

    return data;

};

const crearCliente = async (cliente) => {

    const { data } = await api.post(
        '/users',
        cliente
    );

    return data;

};

const eliminarCliente = async (id) => {

    const { data } = await api.delete(
        `/users/${id}`
    );

    return data;

};

const loginAdmin = async (username, password) => {

    const { data } = await api.get('/users');

    const usuarioEncontrado = data.find(
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