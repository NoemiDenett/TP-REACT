
import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import juego_tronos from '../Vistas/Imagenes/juego_tronos.jpg';
import harry_potter from '../Vistas/Imagenes/harry_potter.jpg';
import eragon from '../Vistas/Imagenes/eragon.jpg';
import Ratio from 'react-bootstrap/Ratio';
import Button from 'react-bootstrap/Button';
function Home() {

  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  setTimeout(() => {
    document.getElementById('titulo_app').innerHTML = 'Inicio';
  }, 2500);

  function ver_mas() {
    try {
      var elemento = document.getElementsByClassName('active')[1];
      var texto_ele = document.getElementsByClassName(elemento.id)[0];
      texto_ele.classList.toggle('ver_mas');
    } catch (error) {
    }
  }

  return (
    <Container>
      <div className='card mb-3 mt-3'>
        <Button id='reset' key={'info_ver_mas'} className='margin_left_085rem mb-3 mt-3' onClick={event => ver_mas()} variant="info" type="reset">
        <i class="fas fa-solid fa-text-width"></i>  Ver mas texto
        </Button>
      </div>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item id='primero'>
          <Ratio aspectRatio="16x9">
            <img
              className="d-block w-100"
              src={juego_tronos}
              alt="Portadas de los libros de Juego de tronos"
            />
          </Ratio>
          <Carousel.Caption className='card primero'>
            <h5>Juego de tronos</h5>
            <p>Escrito por George R.R. Martin, es el primero de una épica serie de fantasía conocida como "Canción de Hielo y Fuego"</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item id='segundo'>
          <Ratio aspectRatio="16x9">
            <img
              className="d-block w-100"
              src={harry_potter}
              alt="Portadas de los libros de Harry Potter"
            />
          </Ratio>
          <Carousel.Caption className='card segundo'>
            <h5>Harry Potter</h5>
            <p>Es una serie de siete libros escrita por J.K. Rowling que ha capturado la imaginación de millones de lectores en todo el mundo</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item id='tercero'>
          <Ratio aspectRatio="16x9">
            <img
              className="d-block w-100"
              src={eragon}
              alt="Portadas de los libros de Eragon"
            />
          </Ratio>
          <Carousel.Caption className='card tercero'>
            <h5>Eragon</h5>
            <p>Es el primer libro de la saga "El Legado" escrita por Christopher Paolini. Este libro narra la historia de Eragon, un joven granjero que descubre un huevo de dragón azul en las Montañas Espina</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default Home;