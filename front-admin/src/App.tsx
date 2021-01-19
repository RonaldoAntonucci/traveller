import React from 'react';

import AppProvider from './contexts';

import GlobalStyle from './styles/global';

import SignIn from './pages/SignIn';

const App: React.FC = () => {
  return (
    <AppProvider>
      <SignIn />
      <GlobalStyle />
    </AppProvider>
  );
};

export default App;
