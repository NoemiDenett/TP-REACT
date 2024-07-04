import Tabla from "../components/Tabla";
import CustomForm from "../components/Custom_Form";
import React, { useEffect, useState, useCallback } from "react";
import { Container } from "react-bootstrap";
import Loading from "../components/Loading";

function Libros(props) {
  const tabla = 'libros';
  const baseUrl = 'http://localhost:4000/' + tabla;
  const [data, set_data] = useState([])
  const [filas, set_filas] = useState([]);  
  const [datos, setDatos] = useState([]);
  const isReady = filas.length > 0;
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

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData()
    }, 100);
    return () => clearInterval(interval);
  }, [fetchData]);



  var privilegio = localStorage.getItem('privilegio');
  if (privilegio != null && privilegio.length > 0) {
    var clase = '';
    if (privilegio !== "Cd17") {
      clase = 'd-none';
    }
    return [
      <Container key='libro_contenedor_div'>
        {isReady ? (
          <Container>
            <Tabla remove_class_existe={props.remove_class_existe} success_mensaje={props.success_mensaje} error_mensaje={props.error_mensaje} key='tabla' acciones={clase} filas_por_pagina={10} tabla={tabla} data={data} ></Tabla>
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
export default Libros;