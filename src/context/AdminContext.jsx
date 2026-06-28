import { createContext, useState, useEffect } from 'react';

export const AdminContext = createContext();

const AdminProvider = ({ children }) => {

    const [admin, setAdmin] = useState(() => {

        const guardado =
            localStorage.getItem('admin');

        if (!guardado) {
            return null;
        }

      if (!adminParseado.user || !adminParseado.password) {
        localStorage.removeItem('admin');
        return null;
      }
        try {

            return JSON.parse(guardado);

        } catch {

            localStorage.removeItem('admin');

            return null;

        }

    });

    useEffect(() => {

        if (admin) {

            localStorage.setItem(
                'admin',
                JSON.stringify(admin)
            );

        } else {

            localStorage.removeItem('admin');

        }

    }, [admin]);

    const login = (datosAdmin) => {

        setAdmin(datosAdmin);

    };

    const logout = () => {

        setAdmin(null);

    };

    return (

        <AdminContext.Provider
            value={{
                admin,
                login,
                logout
            }}
        >

            {children}

        </AdminContext.Provider>

    );

};

export { AdminProvider };