import { Container } from "react-bootstrap";
import React, { useState } from "react";
import CustomForm from "../components/Custom_Form";
import { useNavigate } from "react-router-dom"

function Registrarse(props) {
    const tabla = 'usuarios';
    const baseUrl = 'http://localhost:4000/' + tabla;
    const [datos, setDatos] = useState([]);
    let navigate = useNavigate();
    const [fired, setfired] = useState(false);

    let data = [{
        "id": "",
        "nombre": "",
        "email": "@gmail.com",
        "pass": "",
        "privilegio": ""
    }];

    let filas = Object.keys(data[0]);

    setTimeout(() => {
       try {
        document.getElementById('titulo_app').innerHTML = 'Registrarse';
        document.getElementById('submit').addEventListener("mouseover", validar);
       } catch (error) {
        
       }
    }, 1500);

    function validar() {
        try {
            var boton = document.getElementById('submit');
            if (fired === false) {
                if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(document.getElementById('email').value)) {
                    props.error_mensaje('Porfavor escribi un email valido');
                    boton.classList.add('desactivado');
                    setfired(true);
                    return
                }

                if (document.getElementById('pass').value.length < 4) {
                    props.error_mensaje('La contraseña tiene que tener mas de 4 caracteres');
                    boton.classList.add('desactivado');
                    setfired(true);
                    return
                }

            }

        } catch (error) {
            props.error_mensaje('Email o contraseña incorrecto');
        }
    }

    setInterval(() => {
        load();
    }, 100);

    function load() {
        try {
            var elemento = document.getElementById('privilegio');
            elemento.value = 'Cd18';
            document.getElementById('group_privilegio').classList.add('d-none');
        } catch (error) {

        }
    }
    var privilegio = localStorage.getItem('privilegio');

    if (privilegio == null || privilegio.length === 0) {
        return [
            <Container key={'container_registrarse'}>
                <CustomForm success_mensaje={props.success_mensaje} error_mensaje={props.error_mensaje} elementos={filas} id={'enviar_datos'} titulo={'Cargar'} clase={''} datos={datos} setDatos={setDatos} baseUrl={baseUrl} ></CustomForm>
            </Container>
        ];
    } else {
        setTimeout(() => {
            navigate('/Libros');
        }, 1500);
    }
}
export default Registrarse;