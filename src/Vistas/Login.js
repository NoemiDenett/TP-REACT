import CustomForm from "../components/Custom_Form";
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
function Login(props) {

    let data = [{
        "email": "@gmail.com",
        "Contraseña": ""
    }];
    const [datos, setDatos] = useState([]);
    let columnas = Object.keys(data[0]);
	let navigate = useNavigate()

    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }

    const onButtonClick = (event) => {
        try {
            event.preventDefault();
            var email = datos['email'];
            var password = datos['Contraseña'];

            if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
                props.error_mensaje('Porfavor escribi un email valido')
                return
            }

            if (password.length < 4) {
                props.error_mensaje('La contraseña tiene que tener mas de 4 caracteres')
                return
            }
            Buscar_data();

        } catch (error) {
            props.error_mensaje('Email o contraseña incorrecto');
        }
    }


    function recibir_respuesta(e) {
        try {
            var email = datos['email'];
            var password = datos['Contraseña'];
            let obj = e.find(o => o.email === email && o.pass === password);
            if (obj !== null) {
                localStorage.setItem('nombre', obj.nombre);
                localStorage.setItem('privilegio', obj.privilegio);
                props.success_mensaje('Bienvenido: ' + obj.nombre);
                setTimeout(() => {
                    navigate("/inicio");
                }, 1500);

            } else {
                props.error_mensaje('Email o contraseña incorrecto')
            }
        } catch (error) {
            props.error_mensaje('Email o contraseña incorrecto')
        }
    }

    async function Buscar_data() {
        try {
            const response = await fetch('http://localhost:4000/usuarios');
            if (response.ok) {
                response.json().then(e => recibir_respuesta(e))
            } else {
                props.error_mensaje('Ocurrio un error');
            }
        } catch (error) {
            props.error_mensaje('Ocurrio un error');
        }
    }
 
    setTimeout(() => {
        document.getElementById('titulo_app').innerHTML = 'Iniciar session';
    }, 1500);

    var privilegio = localStorage.getItem('privilegio');

    if (privilegio == null || privilegio.length === 0) {
        if (getCookie('error') === 'true') {
            props.error_mensaje('No tenes permisos para acceder');
            document.cookie = "error=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
        return [
            <Container key={'container_form'}>
                <CustomForm error_mensaje={props.error_mensaje} elementos={columnas} id={'login'} titulo={'Ingresar los datos'} clase={'mt-3'} datos={datos} setDatos={setDatos} validar={onButtonClick} ></CustomForm>
            </Container>
        ];
    } else {
        setTimeout(() => {
            navigate('/Libros');
        }, 1500);
    }
}

export default Login;