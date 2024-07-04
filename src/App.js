//App.js
import React from "react";
import './App.css';
import Toast, { Toaster } from 'react-hot-toast';
import Login from "./Vistas/Login";
import Registrarse from "./Vistas/registrarse";
import Salir from "./Vistas/Salir";
import Home from "./Vistas/Home";
import Usuarios from "./Vistas/Usuarios";
import Libros from "./Vistas/Libros";
import Menuusuario from "./components/Menu_usuario";
import Permisos from "./Vistas/Permisos";
import { useNavigate } from "react-router-dom"

import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes,
    Outlet,
} from "react-router-dom";

import { Navbar, Nav } from "react-bootstrap";


function NotFound() {
    let navigate = useNavigate();
    setTimeout(() => {
        navigate('/Login');
    }, 1500);
    return (
        <div className="card">
            <h2 className="margin_left_085rem">No se pudo encontrar la pagina</h2>
            <p className="margin_left_085rem">Lo sentimos, la seccion que estas tratando de cargar no existe.</p>
        </div>
    );
}

function success_mensaje(mensaje) {
    Toast.success(
        mensaje,
        {
            duration: 2000,
        }
    );
}

function redirect() {
    try {
        setTimeout(() => {
            let navigate = useNavigate();
            document.cookie = 'error=true';
            navigate('/Login');
        }, 2500);
    } catch (error) {
        error_mensaje('Ocurrio un error en el redirect');
    }

}

function remove_class_existe(clase) {
    try {
        let x = document.getElementsByClassName(clase);
        if (x.length > 0) { x[0].classList.remove(clase); }
    } catch (error) {

    }
}

function error_mensaje(titulo_mensaje) {
    Toast.error(
        titulo_mensaje,
        {
            duration: 2000,
        }
    );
}

function App() {
    return (
        <Router>
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand>
                    <h1 className="ml-3 text-green">LibroWiki</h1>
                </Navbar.Brand>
                <Toaster
                    position="bottom-right"
                    reverseOrder={false}
                />
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto w-100">
                        <Nav.Link id="inicio_link" className="text-white" as={Link} to="/inicio" exact>
                        <i class="fa fa-home"></i> Inicio
                        </Nav.Link>
                        <Menuusuario remove_class_existe={remove_class_existe} error_mensaje={error_mensaje}></Menuusuario>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <main className="container mt-4">
                <h2 id="titulo_app" className="ml-3 text-center card capitalize" >Inicio</h2>
                <Routes>
                    <Route path="/" element={<Outlet />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/inicio" element={<Home/>} />
                        <Route path="/Salir" element={<Salir />} />
                        <Route path="/Libros" element={<Libros remove_class_existe={remove_class_existe} success_mensaje={success_mensaje} redirect={redirect} error_mensaje={error_mensaje} />} />
                        <Route path="/Usuarios" element={<Usuarios remove_class_existe={remove_class_existe} success_mensaje={success_mensaje} redirect={redirect} error_mensaje={error_mensaje} />} />
                        <Route path="/Permisos" element={<Permisos remove_class_existe={remove_class_existe} success_mensaje={success_mensaje} redirect={redirect} error_mensaje={error_mensaje} />} />
                        <Route path="/Login" element={<Login success_mensaje={success_mensaje} error_mensaje={error_mensaje} />} />
                        <Route path="/registrarse" element={<Registrarse success_mensaje={success_mensaje} error_mensaje={error_mensaje} />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </main>
            <footer className="bg-dark card">
                <Navbar.Brand>
                    <h3 className="ml-3 text-green" >Tp de Noemi Denett</h3>
                </Navbar.Brand>
            </footer>
        </Router>

    );

}
export default App;