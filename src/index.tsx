import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import { Header } from 'components/Header';
import { Routes } from 'routes';

import { AppContainer } from './styled';
import { theme } from './theme';

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(<App />, document.getElementById('root'));
});

const App: React.FC = () => (
    <ThemeProvider theme={theme}>
        <RecoilRoot>
            <AppContainer>
                <BrowserRouter basename="/">
                    <Header />
                    <Routes />
                </BrowserRouter>
            </AppContainer>
        </RecoilRoot>
    </ThemeProvider>
);
