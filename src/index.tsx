import ReactDOM from 'react-dom';
import React from 'react';
import { AppContainer } from './styled';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'routes';
import { Header } from 'components/Header';

document.addEventListener('DOMContentLoaded', function () {
	ReactDOM.render(<App />, document.getElementById('root'));
});

const App: React.FC = () => (
	<AppContainer>
		<BrowserRouter basename={'/'}>
			<Header/>
			<Routes/>
		</BrowserRouter>
	</AppContainer>
);