import { createContext, useState, useEffect } from 'react';

export const AdminContext = createContext();

function AdminProvider({ children }) {

    const [admin, setAdmin] = useState(() => {
        const guardado = localStorage.getItem('admin');
        return guardado ? JSON.parse(guardado) : null;
    });

    useEffect(() => {
        if (admin) {
            localStorage.setItem('admin', JSON.stringify(admin));
        } else {
            localStorage.removeItem('admin');
        }
    }, [admin]);

    function login(datosAdmin) {
        setAdmin(datosAdmin);
    }

    function logout() {
        setAdmin(null);
    }

    return (
        <AdminContext.Provider value={{ admin, login, logout }}>
            {children}
        </AdminContext.Provider>
    );
}
//Agrego mi nombre al componente
export { AdminProvider };
