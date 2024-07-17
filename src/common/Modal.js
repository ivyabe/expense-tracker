import Modal from 'react-bootstrap/Modal';
import React from "react";
import Button from 'react-bootstrap/Button';

export default CommonModal = (props) => {

    let {
        show,
        content,
        handleClose,
        onConfirm
    } = props;

    return (
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>
                    {content.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {content.body}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button 
                    variant="primary" 
                    onClick={onConfirm}
                >
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}