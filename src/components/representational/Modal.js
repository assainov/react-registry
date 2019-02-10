import React from 'react';

import Modal from 'react-bootstrap/Modal'
import Form from '../../containers/Form';

const studentModal = (props) => {
    let title = 'Add a New Student';
    if (props.mode === 'view') {
        title = 'Student Information';
    }
    return (
        <Modal
            size="lg"
            show={props.modalOpen}
            onHide={props.onCloseModal}
            backdrop="static"
            aria-labelledby="example-modal-sizes-title-sm">
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form />
            </Modal.Body>
        </Modal>
    );
}


export default studentModal;