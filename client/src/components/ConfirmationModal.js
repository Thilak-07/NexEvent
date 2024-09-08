import React from "react";
import { Button, Modal } from "react-bootstrap";

const ConfirmationModal = ({
    showModal,
    setShowModal,
    eventToDelete,
    handleDelete,
}) => {
    return (
        <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            dialogClassName="modal-90w"
        >
            <Modal.Header closeButton className="modal-header">
                <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">
                Are you sure you want to delete the event "
                {eventToDelete?.title}" (ID: {eventToDelete?.id})?
            </Modal.Body>
            <Modal.Footer className="modal-footer">
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    No
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmationModal;
