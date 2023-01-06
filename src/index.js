import React from 'react';
import ReactDOM from 'react-dom'
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

ReactDOM.render(
	<Router>
		<Routes>
			<Route path="/" element={<App />} exact></Route>
		</Routes>
	</Router>,
	document.getElementById('root')
);