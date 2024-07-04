import Tabla from "../components/Tabla";
import CustomForm from "../components/Custom_Form";
import React, { useEffect, useState, useCallback } from "react";
import { Container } from "react-bootstrap";
import Loading from "../components/Loading";
function Usuarios(props) {
  const tabla = 'usuarios';
  const baseUrl = 'http://localhost:4000/' + tabla;
  const [data, set_data] = useState([])
  const [filas, set_filas] = useState([])
  const [datos, setDatos] = useState([]);
  const isReady = filas.length > 0;
  const [fired, setfired] = useState(false);

  const fetchData = useCallback(async () => {
    function pasar_data(data) {
      try {
        set_data(data);
        set_filas(Object.keys(data[0]));
      } catch (error) {
        props.error_mensaje('Ocurrio un error');
      }
    }
    try {
      const response = await fetch(baseUrl);
      if (response.ok) {
        response.json().then(data => pasar_data(data)).catch((error) => {
          props.error_mensaje('Ocurrio un error');
        });
      }
    } catch (error) {

    }
  }, [baseUrl, props])

  useEffect(() => {
    fetchData()
  }, [fetchData]);

  setTimeout(() => {
    try {
      document.getElementById('submit').addEventListener("mouseover", validar);
    } catch (error) {

    }
  }, 1200);


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

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData()
    }, 500);
    return () => clearInterval(interval);
  }, [fetchData]);

  if (localStorage.getItem('privilegio') === 'Cd17') {
    return [
      <Container key='libro_contenedor_div'>
        {isReady ? (
          <Container>
            <Tabla remove_class_existe={props.remove_class_existe} success_mensaje={props.success_mensaje} error_mensaje={props.error_mensaje} key='tabla' acciones={''} filas_por_pagina={10} tabla={tabla} data={data} ></Tabla>
            <CustomForm success_mensaje={props.success_mensaje} error_mensaje={props.error_mensaje} elementos={filas} id={'enviar_datos'} titulo={'Cargar'} clase={'d-none'} datos={datos} setDatos={setDatos} baseUrl={baseUrl} ></CustomForm>
          </Container>
        ) : (
          <Loading></Loading>
        )}
      </Container>
    ];
  } else {
    props.redirect();
  }
}
export default Usuarios;