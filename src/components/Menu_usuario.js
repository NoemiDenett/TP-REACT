import NavDropdown from 'react-bootstrap/NavDropdown';
import React, { useEffect, useState } from "react";
import { Container, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import Modalcustom from './Modal_custom';
import { useNavigate } from "react-router-dom"

function Menu_usuario(props) {

    const [show, setShow] = useState(false);
    const [data, set_data] = useState([]);
    let permiso = localStorage.getItem('privilegio');
    let navigate = useNavigate();

    function get_nombre() {
        var nombre = '';
        try {
            nombre = (localStorage.getItem('nombre'));
            if(nombre === null){
                nombre = '';
            }
        } catch (error) {
            nombre = '';
            props.error_mensaje('Ocurrio un error');
        }
        return nombre;
    }

    useEffect(() => {
        async function Buscar_data() {
            try {
                if (permiso != null) {
                    const response = await fetch('http://localhost:4000/permisos/' + permiso);
                    if (response.ok) {
                        response.json().then(data => set_data(data)).catch((error) => {
                            props.error_mensaje('Ocurrio un error');
                        });
                    }
                }

            } catch (error) {
                props.error_mensaje('Ocurrio un error');
            }
        }
        Buscar_data();
    }, [permiso, props]);

    function salir(event) {
        try {
            document.getElementById('basic-nav-dropdown').click();
            event.preventDefault();
            event.stopPropagation();
            setShow(true);
        } catch (error) {
            props.error_mensaje('Ocurrio un error');
        }
    }

    function cerrar_sesion() {
        try {
            navigate("/Salir");
        } catch (error) {
            props.error_mensaje('Ocurrio un error');
        }
    }


        if (get_nombre().length < 1  ) {

            return (
                <>
             <NavLink id='login_link' className="text-white" as={Link} to="/Login">
             <i class="fas fa-sign-in-alt"></i> Iniciar session
                </NavLink>
                <NavLink id='registrarse_link' className="text-white" as={Link} to="/registrarse">
                <i class="fas fa-sign-in-alt"></i> Registrarse
                </NavLink>
            </>
            );

        } else if (permiso.length > 0 && data['tablas'] !== undefined) {
            try {
                return (
                    <Container>
                        <Modalcustom boton_texto={'Salir'} body={'¿ Estas seguro que vas a cerrar la session?'} titulo={'Vas a cerrar la session'} call={cerrar_sesion} show={show} setShow={setShow} ></Modalcustom>
                        <NavDropdown title="Menu del usuario" id="basic-nav-dropdown">
                            <p className="text-center mayus"> {get_nombre()}</p>
                            <NavDropdown.Divider />
                            {data['tablas'].split(',').map((elemento, index) => {
                                return <NavLink id={index} key={index} className="mayus" as={Link} to={'/' + elemento} onClick={event => {
                                    document.getElementById('basic-nav-dropdown').click();
                                    props.remove_class_existe('active');
                                    event.target.classList.add('active');
                                }}>
                                   <i class="fas fa-solid fa-table"></i> {elemento}
                                </NavLink>
                            })}
                            <NavDropdown.Divider />
                            <NavLink onClick={event => salir(event)}>
                            <i class="fas fa-sign-out-alt"></i>     Salir
                            </NavLink>
                        </NavDropdown>
                    </Container>

                )

            } catch (error) {
                props.error_mensaje('Ocurrio un error');
            }
        }
    }

export default Menu_usuario;