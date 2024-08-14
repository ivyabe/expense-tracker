import Modal from 'react-bootstrap/Modal';
import React from "react";BTN_CONFIRM
import Button from 'react-bootstrap/Button';
import { isLoggedIn } from '../service/AuthService';
import { BTN_OK, BTN_CLOSE, BTN_CONFIRM } from '../const/Constants';

export default CommonModal = (props) => {

    let {
        show,
        content,
        handleClose,
        onConfirm,
        back
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
                {
                    isLoggedIn() ? 
                    <div>
                        <Button variant="secondary" onClick={handleClose}>
                            {BTN_CLOSE}
                        </Button>
                        <Button 
                            variant="primary" 
                            onClick={onConfirm}
                            className="modal-btn-left"
                        >
                            {BTN_CONFIRM}
                        </Button>
                    </div>
                    :
                    <Button variant="secondary" onClick={back}>
                            {BTN_OK}
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    )
}