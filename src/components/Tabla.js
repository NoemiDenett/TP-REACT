import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import Pagination from 'react-bootstrap/Pagination';
import Modalcustom from './Modal_custom';

function Tabla(props) {
    const [columnas, setcolumnas] = useState([]);
    const [filas, setfilas] = useState([]);
    let [render, set_render] = useState([]);
    let [data_select, set_data_select] = useState([]);
    const [anterior_state, set_anterior_state] = useState(false);
    const [siguiente_state, set_siguiente_state] = useState(false);
    var [disabled_select, set_disabled_select] = useState(false);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [show, setShow] = useState(false);
    const [sorting, setSorting] = useState({ field: 'id', ascending: false });
    let [id_borrar, set_id_borrar] = useState(0);

    const goOnPrevPage = () => {
        try {
            if (currentPageNumber === 1) {
                return;
            }
            setCurrentPageNumber((prev) => prev - 1);
        } catch (error) {
            props.error_mensaje('Ocurrio un error');
        }
    };
    const goOnNextPage = () => {
        try {
            if (currentPageNumber === props.data.length / props.filas_por_pagina) {
                return;
            }
            calcular_pagina();
        } catch (error) {
            props.error_mensaje('Ocurrio un error');
        }
    };

    function calcular_pagina() {
        try {
            if (props.data.length / props.filas_por_pagina > currentPageNumber) {
                setCurrentPageNumber(Number.parseInt(currentPageNumber) + 1);
            }
        } catch (error) {
            props.error_mensaje('Ocurrio un error');
        }

    }

    function applySorting(key, ascending, elemento) {
        try {
            props.remove_class_existe('ordenar_abajo');
            props.remove_class_existe('ordenar_arriba');
            setSorting({ key: key, ascending: ascending });
            if (ascending === true) {
                document.getElementById(elemento).classList.add('ordenar_arriba');
                document.getElementById(elemento).classList.remove('ordenar_abajo');
            } else {
                document.getElementById(elemento).classList.remove('ordenar_arriba');
                document.getElementById(elemento).classList.add('ordenar_abajo');
            }
        } catch (error) {
            props.error_mensaje('Ocurrio un error');
        }
    }

    const handleSelectChange = (event) => {
        try {
            if (event.isTrusted === true) {
                setCurrentPageNumber(event.target.value);
                calcular_pagina();

            }
        } catch (error) {
            props.error_mensaje('Ocurrio un error');
        }

    };

    useEffect(() => {
        function paginado_activado() {
            try {
                props.remove_class_existe('activado');
                let elemento = document.getElementById('paginado_' + currentPageNumber);
                elemento.classList.add('activado');
            } catch (error) {

            }
        }
        paginado_activado();
    }, [currentPageNumber, props]);


    useEffect(() => {
        set_tabla();
    }, [props.data]);


    function set_tabla() {
        try {
            document.getElementById('titulo_app').innerHTML = props.tabla;
            if (props.data.length > 0) {
                setcolumnas(Object.keys(props.data[0]));
                if (props.data.length > props.filas_por_pagina) {
                    let start = (currentPageNumber - 1) * props.filas_por_pagina;
                    if (start === 0) {
                        start++;
                    }

                    const end = currentPageNumber * props.filas_por_pagina;

                    if (start >= end) {
                        set_render(props.data);
                        set_disabled_select(true);
                        set_anterior_state(false);
                        set_siguiente_state(false);
                        set_data_select([]);
                    } else {
                        set_disabled_select(false);
                        set_siguiente_state(true);
                        if (currentPageNumber < 1) {
                            setCurrentPageNumber(1);
                            set_anterior_state(false);
                        }
                        if (currentPageNumber > 1) {
                            set_anterior_state(true);
                        }

                        if (currentPageNumber === 1) {
                            set_anterior_state(false);
                        }

                        var select_data = new Array(Math.ceil(props.data.length / props.filas_por_pagina));
                        if (currentPageNumber === select_data.length) {
                            set_siguiente_state(false);
                        } else {
                            set_siguiente_state(true);
                        }

                        set_render(props.data.slice(start - 1, end - 1));
                        set_data_select(select_data);
                    }
                } else {
                    set_anterior_state(false);
                    set_disabled_select(true);
                    set_siguiente_state(false);
                    set_data_select(Array(props.data.length / props.data.length));
                    set_render(props.data);
                }

                if (render.length > 0) {
                    setfilas(render);
                }

            }
        } catch (error) {
            props.error_mensaje('Ocurrio un error');
        }
    }

    function editar(event, id) {
        try {
            call_form(event, 'Editar fila');
            document.querySelector('#enviar_datos').method = 'get';
            Buscar_data(id);
        } catch (error) {
            console.log(error);
            props.error_mensaje('Ocurrio un error');
        }
    }

    function pasar_data_form(data) {
        try {
            columnas.forEach(element => {
                document.getElementById(element).value = data[element];
            });
        } catch (error) {
            props.error_mensaje('Ocurrio un error');
        }
    }

    async function Buscar_data(id) {
        try {
            const response = await fetch('http://localhost:4000/' + props.tabla + '/' + id);
            if (response.ok) {
                response.json().then(data => pasar_data_form(data)).catch((error) => {
                    props.error_mensaje('Ocurrio un error');
                });
            }
        } catch (error) {
            props.error_mensaje('Ocurrio un error');
        }
    }

    function borrar(event, id) {
        try {
            event.stopPropagation();
            if (event.isTrusted === true) {
                set_id_borrar(id);
                setShow(true);
            } else {
                props.error_mensaje('Ocurrio un error');
            }
        } catch (error) {
            props.error_mensaje('Ocurrio un error');
        }
    }

    function call_form(event, titulo) {
        try {
            event.stopPropagation();
            let form = document.getElementById('cont_enviar_datos');
            let agregar_boton = document.getElementById('agregar_boton');
            if (form.classList.contains('d-none')) {
                agregar_boton.innerHTML = '<i class="fas fa-edit"></i> Sair del formulario';
            } else {
                agregar_boton.innerHTML = '<i class="fas fa-edit"></i> Agregar';
            }
            form.classList.toggle('d-none');
            var elementos = document.querySelector('#enviar_datos').elements;
            for (let index = 0; index < elementos.length; index++) {
               elementos[index].value = '';
            }
            document.getElementById(props.tabla).classList.toggle('d-none');
            document.getElementById('titulo_enviar_datos').innerHTML = titulo;
            document.getElementById('paginado_input_group').classList.toggle('d-none');
            document.getElementById('paginado_container').classList.toggle('d-none');
        } catch (error) {
            props.error_mensaje('Ocurrio un error');
        }
    }

    function agregar(event) {
        try {
            call_form(event, 'Cargar fila');
            document.querySelector('#enviar_datos').method = 'post';
        } catch (error) {
            props.error_mensaje('Ocurrio un error en el boton de agregar');
        }
    }

    function borrar_call() {
        try {

            axios.delete('http://localhost:4000/' + props.tabla + '/' + id_borrar)
                .then(response => {
                    if (response.status === 200) {
                        props.success_mensaje('Dato borrado');
                    }
                })
                .catch(error => {
                    props.error_mensaje('Ocurrio un error en el boton de borrar');
                });

        } catch (error) {
            props.error_mensaje('Ocurrio un error en el boton de borrar');
        }
    }

    useEffect(() => {
        try {
            if (filas.length > 0) {
                let start = (currentPageNumber - 1) * props.filas_por_pagina;
                if (start === 0) {
                    start++;
                }
                const end = currentPageNumber * props.filas_por_pagina;
                const data_copy = [...props.data];
                const sort_data = data_copy.sort((a, b) => {
                    return a[sorting.key].localeCompare(b[sorting.key]);
                });
                set_render(sort_data.slice(start - 1, end - 1));
                setfilas(sorting.ascending ? render : render.reverse());
            }
        } catch (error) {

        }
    }, [currentPageNumber, filas.length, props.data, props.filas_por_pagina, render, sorting]);

    if (props.data.length > 0) {
        return (
            <Container className='contenedor'>
                <Modalcustom boton_texto={'Borrar fila'} body={'¿ Estas seguro que vas a borrar el dato?'} titulo={'Vas a borrar la fila'} call={borrar_call} show={show} setShow={setShow} ></Modalcustom>
                <Card.Header className='bg-light card-header justify-content-center flex mb-1'>
                    {props.acciones.length <= 0 &&
                        <Button id='agregar_boton' onClick={(event) => agregar(event)} variant="outline-primary mb-5 w-25"><i class="fas fa-edit"></i> Agregar</Button>
                    }
                    <Container>
                        <InputGroup id='paginado_input_group' className="mb-3 w-auto">
                            <InputGroup.Text id="paginado_text_input_group">Pagina</InputGroup.Text>
                            <Form.Select key={'paginado'} disabled={disabled_select} id='paginado' className='margin_left_085rem pb-3 ' name="paginado" onChange={handleSelectChange} value={currentPageNumber} >
                                {Array.from(data_select)
                                    .map((e, i) => i + 1)
                                    .map((val) => {
                                        return <option key={val}>{val}</option>;
                                    })}
                            </Form.Select>
                        </InputGroup>
                    </Container>
                </Card.Header>

                <Table id={props.tabla} key={props.tabla} variant="light" bordered hover className='table' responsive>

                    <thead key={'thead'}>
                        <tr>
                            {columnas.map((heading, index) => {
                                return <th onClick={() => applySorting(heading, !sorting.ascending, heading + '_id')} className='mayus' id={heading + '_id'} key={heading + '_' + index}>
                                    {heading}
                                </th>

                            })}
                            {props.acciones.length <= 0 &&
                                <th key={'Acciones'}>
                                    Acciones
                                </th>
                            }
                        </tr>
                    </thead>
                    <tbody key={'tbody'}>
                        {filas.map((item, index) => (
                            <tr id={item.id + '_tr'} key={item.id}>
                                {Object.values(item).map((val, index_2) => (
                                    <td key={index_2} className='mayus'>{val}</td>
                                ))}
                                {props.acciones.length <= 0 &&
                                    <td className={props.acciones} key={index + '_accion'}>
                                        <Button key={index + '_acciion_editar'} onClick={(event) => editar(event, item.id)} variant="outline-primary">  <i class="fas fa-edit"></i> Editar</Button>
                                        <Button key={index + '_acciion_borrar'} className='margin_left_085rem' onClick={(event) => borrar(event, item.id)} variant="outline-danger">  <i class="fa-solid fa-trash fas"></i> Borrar</Button>
                                    </td>
                                }
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            {columnas.map(heading => {
                                return <td className='mayus' key={heading + '_footer'}>
                                    <p></p>
                                </td>

                            })}
                            {props.acciones.length <= 0 &&
                                <td key={'Acciones_footer'}>
                                    <p></p>
                                </td>
                            }
                        </tr>
                    </tfoot>

                </Table>
                <Pagination className='bg-light w-100 p-2' id="paginado_container" key={'paginado_container_botoenes_footer'}>
                    <Pagination.First onClick={() => setCurrentPageNumber(1)} />
                    <Button id='anterior_tabla' variant={'outline-primary margin_left_085rem ' + (anterior_state ? '' : 'disabled')} onClick={goOnPrevPage}>Anterior</Button>

                    {Array.from(data_select)
                        .map((e, i) => i + 1)
                        .map((val) => {
                            return <Pagination.Item id={'paginado_' + val} onClick={() => setCurrentPageNumber(val)} className='margin_left_085rem' key={val}> {val} </Pagination.Item>;
                        })}
                    <Button id='siguiente_tabla' variant={'outline-primary margin_left_085rem ' + (siguiente_state ? '' : 'disabled')} onClick={goOnNextPage}>Siguiente</Button>
                    <Pagination.Last className='margin_left_085rem' onClick={() => setCurrentPageNumber(data_select.length)} />
                </Pagination>
            </Container>
        );
    }
}
export default Tabla;