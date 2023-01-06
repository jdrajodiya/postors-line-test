// All Contacts
import React, { useEffect, useState } from 'react';
import useDebouncedEffect from 'use-debounced-effect';
import { Modal } from 'react-bootstrap';

import { api, FILTERS, PAGINATION } from '../common';
import Contacts from './contacts';

const AllContacts = ({ closeModal, openModal }) => {

    const [contacts, setContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    
    const [formValues, setFormValues] = useState({
        isShowEven: false,
        search: ''
    });
    const [filters, setFilters] = useState({
        page: PAGINATION.page, 
        companyId: FILTERS.companyId
    });

    // Apply search filter on the delay of 500 miliseconds
	useDebouncedEffect(() => {
        setFilters({ ...filters, page: 1, query: formValues?.search });
    }, 500, [formValues?.search]);

    useEffect(() => {
        getContacts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    // Get Contact from API
    const getContacts = async () => {
        api('contacts.json', { params: filters })
        .then(({data}) => {
            let contactList = [...Object.values(data?.contacts)];
            // To Append Contact on pagination
            if (filters.page !== 1) {
                contactList = [...contacts, ...contactList];
            }
            setContacts(contactList);
            setIsLoading(false);
            setIsMoreLoading(false);
        });
    }

    // Input Changes
    const handle = {
        change: e => { setFormValues({ ...formValues, search: e?.target?.value}); },
        check: (e) => { setFormValues({ ...formValues, isShowEven: e?.target?.checked }); }
    }

    // Infinite Scroll pagination
    const handleScroll = (getScrollHeight, getScrollTop, getClientHeight) => {
        const nextPage = filters.page + 1;
        if (((getScrollTop + getClientHeight) === getScrollHeight) && filters.page !== nextPage) {
            setIsMoreLoading(true);
            setFilters({ ...filters, page: nextPage });
        }
    }

    return (
        <React.Fragment>
        
            <Modal show={true} onHide={closeModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h5 className="modal-title">Modal A - All Contacts</h5>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <div className="form-group mb-0 w-50">
                            <input 
                                type="text"
                                className="form-control" 
                                placeholder="Search Contact"
                                onChange={handle.change}
                                value={formValues?.search} 
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        setFilters({ ...filters, query: e.target.value });
                                    }
                                }}
                            />
                        </div>

                        <button className="btn button-secondary" onClick={() => openModal('us')}>
                            US Contacts
                        </button>

                    </div>

                    {/* Contact List */}
                    <Contacts 
                        handleScroll={handleScroll} 
                        contacts={contacts} 
                        isShowEven={formValues?.isShowEven}
                        isLoading={isLoading}
                    />

                    {/* Loader for scrolling */}
                    { 
                        (isMoreLoading && contacts.length > 0) &&
                        <div className="d-flex align-items-center justify-content-center my-2">
                            <div class="spinner-border text-primary spinner-sm"> </div>
                            <h6 className="ml-3 mb-0">Loading...</h6>
                        </div>
                    }

                </Modal.Body>

                <Modal.Footer>
                    <div className="d-flex align-items-center justify-content-between w-100">
                        <div className="form-check">
                            <input 
                                type="checkbox" 
                                className="form-check-input" 
                                value={formValues?.isShowEven} 
                                onChange={handle.check} 
                                id="showEven"
                            />
                            <label className="form-check-label" htmlFor="showEven">Only even</label>
                        </div>
                        <button type="button" className="btn button-c-color" onClick={closeModal}>Close</button>
                    </div>
                </Modal.Footer>
            </Modal>

        </React.Fragment>
    )
}

export default AllContacts;
