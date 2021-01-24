import React from 'react';
import Loading from '../components/Loading';

import theme from '../styles/theme';
import { AuthProvider } from './auth';
import { LoadingProvider } from './loading';

import { ThemeProvider } from './Theme';

const AppProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <LoadingProvider Component={Loading}>
        <AuthProvider>{children}</AuthProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
