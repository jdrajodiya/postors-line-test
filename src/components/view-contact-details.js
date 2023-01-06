// Contact Details
import React from 'react';
import { Modal } from 'react-bootstrap';

import { getName } from '../common';

const ViewContactDetails = ({ data, closeModal }) => {

    return (
        <React.Fragment>
        
            <Modal show={true} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h5 className="modal-title">Modal C - Contact Details</h5>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h2 className="mb-3">Contact Details</h2>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <strong>ID:</strong> { data?.id || '-' }
                        </li>
                        <li className="list-group-item">
                            <strong>Name:</strong> { getName(data) }
                        </li>
                        <li className="list-group-item">
                            <strong>Email:</strong> { data?.email || '-' }
                        </li>
                        <li className="list-group-item">
                            <strong>Phone Number:</strong> { data?.phone_number || '-' }
                        </li>
                    </ul>
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={closeModal}>
                        Close
                    </button> 
                </Modal.Footer>
            </Modal>

        </React.Fragment>
    )
}

export default ViewContactDetails;