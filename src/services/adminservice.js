const adminsData = [
    {
        id: 1,
        nombre: "Guanactolay Franco",
        user: "Franco",
        password: "12345",
        sector: "Gerencia"
    },
    {
        id: 2,
        nombre: "Angulo Valen",
        user: "Valen",
        password: "12345",
        sector: "Soporte"
    },
    {
        id: 3,
        nombre: "Chosco Fabri",
        user: "Fabri",
        password: "12345",
        sector: "Gerencia"
    },
    {
        id: 4,
        nombre: "Colque inti",
        user: "Inti",
        password: "12345",
        sector: "Soporte"
    }
];

const loginAdmin = (user, password) => {
    const adminEncontrado = adminsData.find(
        admin =>
            admin.user.toLowerCase() === user.toLowerCase() &&
            admin.password === password
    );

    return adminEncontrado || null;
};

const obtenerAdmins = () => {
    return [...adminsData];
};

const obtenerAdminPorId = (id) => {
    return adminsData.find(admin => admin.id === Number(id)) || null;
};

const adminService = {
    loginAdmin,
    obtenerAdmins,
    obtenerAdminPorId
};

export default adminService;