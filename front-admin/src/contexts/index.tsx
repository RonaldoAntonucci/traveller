import React from 'react';
import Loading from '../components/Loading';
import ToastContainer from '../components/ToastContainer';

import theme from '../styles/theme';
import { AuthProvider } from './auth';
import { LoadingProvider } from './loading';

import { ThemeProvider } from './Theme';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <LoadingProvider Component={Loading}>
        <ToastProvider Component={ToastContainer}>
          <AuthProvider>{children}</AuthProvider>
        </ToastProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
