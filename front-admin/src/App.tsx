import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppProvider from './contexts';

import GlobalStyle from './styles/global';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes />
        <GlobalStyle />
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
