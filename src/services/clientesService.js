const clientes = [
    {
        id: 1,
        nombre: 'Juan',
        apellido: 'Perez',
        email: 'juan@gmial.com',
        telefono: '123456789',
        direccion: 'Calle Falsa 123'
    },
    {
        id: 2,
        nombre: 'Maria',
        apellido: 'Gomez',
        email: 'maria@mail.com',
        telefono: '987654321',
        direccion: 'Avenida Siempre Viva 456'
    },
    {
        id: 3,
        nombre: 'Carlos',
        apellido: 'Sanchez',
        email: 'carlos@mail.com',
        telefono: '555555555',
        direccion: 'Calle Real 789'
    },
    {
        id: 4,
        nombre: 'Ana',
        apellido: 'Martinez',
        email: 'ana@mail.com',
        telefono: '111222333',
        direccion: 'San Martin 101'
    },
    {
        id: 5,
        nombre: 'Luis',
        apellido: 'Fernandez',
        email: 'luis@mail.com',
        telefono: '222333444',
        direccion: 'Belgrano 202'
    },
    {
        id: 6,
        nombre: 'Sofia',
        apellido: 'Lopez',
        email: 'sofia@mail.com',
        telefono: '333444555',
        direccion: 'Mitre 303'
    },
    {
        id: 7,
        nombre: 'Diego',
        apellido: 'Ramirez',
        email: 'diego@mail.com',
        telefono: '444555666',
        direccion: 'Rivadavia 404'
    },
    {
        id: 8,
        nombre: 'Lucia',
        apellido: 'Torres',
        email: 'lucia@mail.com',
        telefono: '555666777',
        direccion: 'Sarmiento 505'
    },
    {
        id: 9,
        nombre: 'Pedro',
        apellido: 'Diaz',
        email: 'pedro@mail.com',
        telefono: '666777888',
        direccion: 'Lavalle 606'
    },
    {
        id: 10,
        nombre: 'Valentina',
        apellido: 'Castro',
        email: 'valentina@mail.com',
        telefono: '777888999',
        direccion: 'Alvear 707'
    }
];

const getClientes = () => {
    return [...clientes];
};

const buscarUsuario = (texto) => {
    const busqueda = texto.toLowerCase();

    return clientes.filter(usuario =>
        usuario.apellido.toLowerCase().includes(busqueda) ||
        usuario.direccion.toLowerCase().includes(busqueda)
    );
};

const clientesService = {
    getClientes,
    buscarUsuario
};

export default clientesService;