    const clientes = [{
        id: 1,
        nombre: 'Juan Perez',
        email: 'juan@gmial.com',
        telefono: '123456789',
        direccion: 'Calle Falsa 123'
    },
    {
        id: 2,
        nombre: 'Maria Gomez',
        email: 'maria@mail.com',
        telefono: '987654321',
        direccion: 'Avenida Siempre Viva 456'
    }, 
    {
        id: 3,
        nombre: 'Carlos Sanchez',
        email: 'carlos@mail.com',
        telefono: '555555555',
        direccion: 'Calle Real 789'
    }
        ];

const getClientes = () => {
    return [...clientes];
}

export { getClientes };