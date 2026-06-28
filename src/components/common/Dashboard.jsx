import { useState, useEffect } from "react";
import clientesService from "../../services/clientesService";
import { Card } from "react-bootstrap";

const Dashboard = () => {

    const [usuarios, setUsuarios] = useState([]);
    const [localizaciones, setLocalizaciones] = useState([]);

    useEffect(() => {

        const cargarUsuarios = async () => {

            const data = await clientesService.obtenerClientes();

            setUsuarios(data);

        };

        cargarUsuarios();

    }, []);

    useEffect(() => {

        if (usuarios.length > 0) {
            localizar();
        }

    }, [usuarios]);

    const localizar = () => {

        const aux = [];

        usuarios.forEach(usuario => {

            const ciudad = usuario.address.city.toLowerCase();

            const encontrada = aux.find(
                localizacion => localizacion.localizacion === ciudad
            );

            if (encontrada) {

                encontrada.cantidad++;

            } else {

                aux.push({
                    localizacion: ciudad,
                    cantidad: 1
                });

            }

        });

        setLocalizaciones(aux);

    };

    return (
        <Card>
            <Card.Title>
                Extras
            </Card.Title>

            <Card.Body>

                <Card.Text>
                    Usuarios totales: {usuarios.length}
                </Card.Text>

                <Card.Text>
                    Cantidad de usuarios por ciudad:
                </Card.Text>

                {
                    localizaciones.map(localizacion => (
                        <Card.Text key={localizacion.localizacion}>
                            {localizacion.localizacion}: {localizacion.cantidad}
                        </Card.Text>
                    ))
                }

            </Card.Body>
        </Card>
    );
};

export default Dashboard;