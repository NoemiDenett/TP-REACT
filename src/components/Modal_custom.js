import Modal from 'react-bootstrap/Modal';
import React from "react";
import Button from 'react-bootstrap/Button';

function Modal_custom(props) {

    
    const handleClose = () => props.setShow(false);

    function click_modal(event) {
        
        if(event.isTrusted === true){
            event.stopPropagation();
            props.call();
            handleClose();
        }
    
    }

    return [
        <Modal key={'modal_custom_key'} show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title> {props.titulo} </Modal.Title>
            </Modal.Header>
            <Modal.Body> {props.body} </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                <i class="fas fa-solid fa-exclamation"></i>  Cerrar
                </Button>
                <Button variant="danger" onClick={(event) => { click_modal(event) }}>
                <i class="fas fa-solid fa-exclamation"></i>  {props.boton_texto}
                </Button>
            </Modal.Footer>
        </Modal>

    ];
}

export default Modal_custom;