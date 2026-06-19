const buscarUsuario = (texto, clientes) => {
    const busqueda = texto.toLowerCase();

    return clientes.filter(usuario =>
        usuario.name.lastname.toLowerCase().includes(busqueda) ||
        usuario.address.city.toLowerCase().includes(busqueda)
    );
};

const clientesService = {
    buscarUsuario
};

export default clientesService;