import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import React, { useState, useCallback } from 'react';
import Modalcustom from './Modal_custom';
import axios from 'axios';

function Custom_Form(props) {

    let tipos = [];
    tipos['pass'] = 'password';
    tipos['Contraseña'] = 'password';
    tipos['email'] = 'email';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const [show, setShow] = useState(false);
   
    function reset() {
        try {
            var elementos = document.querySelector('#' +  props.id).elements;
            for (let index = 0; index < elementos.length; index++) {
               elementos[index].value = '';
            }
            props.setDatos([]);

        } catch (error) {
            props.error_mensaje('Ocurrio un error');
        }
    }

    const send_data = useCallback(async () => {

        function dato_enviado(mensaje) {
            try {
                props.success_mensaje(mensaje);
                var elemento = document.getElementById('agregar_boton');
                if (elemento !== null) {
                    elemento.click();
                }
                reset();
            } catch (error) {
                props.error_mensaje('Ocurrio un error');
            }
        }

        switch (document.querySelector('#' + props.id).method) {
            case 'post':
                var data = document.querySelector('#' + props.id);
                data[0].value = generateString(4);
                await axios.post(props.baseUrl, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    if (response.status === 201) {
                        dato_enviado('Dato insertado');
                    }

                }).catch(error => {
                    props.error_mensaje('Ocurrio un error');
                });
                break;
            case 'get': // no se puede pasar PUT como variable en la propiedad method
                await axios.put(props.baseUrl + '/' + document.getElementById('id').value, document.querySelector('#' + props.id), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    if (response.status === 200) {
                        dato_enviado('Dato cambiado');
                    }

                }).catch(error => {
                    props.error_mensaje('Ocurrio un error');
                });

                break;
            default:
                props.error_mensaje('Solamente es posible agregar o editar un dato');
                break;
        }
    }, [props])

    function limpiar(event) {
     try {
        event.preventDefault();
        if (event.isTrusted === true) {
            setShow(true);
        }
     } catch (error) {
        props.error_mensaje('Ocurrio un error');
     }
    }

    function onchange_valor(event) {
        try {
            if (event.isTrusted === true) {
                props.setDatos({
                    ...props.datos,
                    [event.target.id]: event.target.value
                })
            }
            document.getElementById('submit').classList.remove('desactivado');
        } catch (error) {

        }
    }
    function get_data() {
        const formData = new FormData(document.getElementById(props.id));
        const newEntries = [];
        for (const [name, value] of formData) {
            newEntries.push({
                name,
                value
            });
        }
        return newEntries;
    }

    function generateString(length) {
        let result = ' ';
        try {
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
        } catch (error) {

        }
        return result;
    }

    function submit(event) {
        try {
            event.preventDefault();
            event.stopPropagation();
            let data = get_data();
            props.setDatos(data);
            let no_pasar = false;
            if (event.isTrusted === true && data.length > 0) {
                data.forEach(element => {
                    if (element['name'] !== 'id') {
                        if (element['value'] === '') {
                            no_pasar = true;
                        }
                    }
                });
                if(document.getElementById('submit').classList.contains('desactivado') === true){
                    no_pasar = true;
                }
                if (no_pasar === false) {
                    if (props.validar !== undefined) {
                        props.validar(event);
                    } else {
                        send_data();
                    }
                } else {
                    props.error_mensaje('Uno de los campos esta vacio');
                }

            } else {
                props.error_mensaje('Data invalida');
            }
        } catch (error) {
            props.error_mensaje('Data invalida');
        }
    }


    return [
        <Container key={'container_' + props.id} className={props.clase + ' card mb-3 '} id={"cont_" + props.id}>
            <Modalcustom boton_texto={'Limpiar el formulario'} body={'¿ Estas seguro que vas a vaciar el formulario?'} titulo={'Vas a vaciar el formulario'} call={reset} show={show} setShow={setShow} ></Modalcustom>
            <div key={'card-header_' + props.id} className='card-header'>
                <h3 key={'h3_' + props.id} className="ml-3 text-center mayus text-green" id={'titulo_' + props.id} >{props.titulo}</h3>
            </div>
            <Form key={props.id} id={props.id} method='POST' onSubmit={submit}>
                {props.elementos.map((elemento, index) => {
                    let tipo = tipos[elemento];
                    let input_group_class = 'mb-3';
                    if (elemento === 'id') {
                        tipo = 'hidden';
                        input_group_class = 'mb-3 d-none';
                    }
                    return <InputGroup id={'group_' + elemento} key={'input_group_' + elemento} className={input_group_class}>
                        <InputGroup.Text key={'input_group_text' + elemento} className='capitalize' id={'text_' + elemento}>  <i class="fa-solid fa-pen fas"></i> {elemento}</InputGroup.Text>
                        <Form.Control required key={elemento + '_' + index} onChange={(ev) => onchange_valor(ev)} type={tipo} name={elemento} id={elemento}
                            placeholder={"Completar el campo"}
                            aria-label={elemento}
                            aria-describedby={'text_' + elemento}
                        />
                    </InputGroup>
                })}
                <div className='card-footer mt-3'>
                    <Button id='submit' key={'submit'} onClick={event => submit(event)} variant="primary" type="submit">
                    <i class="fa-solid fa-share fas"></i> Enviar
                    </Button>
                    <Button id='reset' key={'reset_boton'} className='margin_left_085rem' onClick={event => limpiar(event)} variant="danger" type="reset">
                    <i class="fa-solid fa-trash fas"></i>  Limpiar
                    </Button>
                </div>
            </Form>
        </Container>
    ];
}
export default Custom_Form;