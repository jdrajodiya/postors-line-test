// App
import React, { useEffect, useState } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';

import AllContacts from './components/all-contacts';
import UsContacts from './components/us-contacts';

const App = () => {

	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [isModalOpen, setIsModalOpen] = useState(null);

	// Open modal based on URL
	useEffect(() => {
		const modal = searchParams.get('modal');
		if(modal) {
			setIsModalOpen({ show: true, type: modal });
		}
	}, [searchParams]);

	const openModal = type => {
		navigate({ search: `?${createSearchParams({ modal: type })}` });
		setIsModalOpen({ show: true, type });
	}

	const closeModal = () => {
		navigate({ search: '' });
		setIsModalOpen(null);
	}

	return (
		<React.Fragment>
			<div className="d-flex justify-content-center align-items-center h-full">
				<button className="btn button-primary mr-2" onClick={() => openModal('all')}>
					Button A
				</button>

				<button className="btn button-secondary" onClick={() => openModal('us')}>
					Button B
				</button>

				{
					isModalOpen?.show && isModalOpen.type === 'all' && <AllContacts closeModal={closeModal} openModal={openModal} />
				}
				{
					isModalOpen?.show && isModalOpen.type === 'us' && <UsContacts closeModal={closeModal} openModal={openModal} />
				}
			</div>
		</React.Fragment>
	)
}

export default App;
