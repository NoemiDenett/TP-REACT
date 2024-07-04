import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

function Loading() {
    return (
        <div key={'contenedor_loading'}>
            <Spinner key={'spiner_loading'} style={{ width: "20rem", height: "20rem" }} animation="border" role="status">
                <span className="visually-hidden">Cargando...</span>
            </Spinner>
        </div>
    );
}
export default Loading;