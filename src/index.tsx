import ReactDOM from 'react-dom';
import React from 'react';
import { AppContainer } from './styled';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'routes';
import { Header } from 'components/Header';
import { Provider } from 'react-redux';
import { store } from './store';

document.addEventListener('DOMContentLoaded', function () {
	ReactDOM.render(<App />, document.getElementById('root'));
});

const App: React.FC = () => (
	<Provider store={store}>
		<AppContainer>
			<BrowserRouter basename={'/'}>
				<Header/>
				<Routes/>
			</BrowserRouter>
		</AppContainer>
	</Provider>
);