import React from 'react';

import theme from '../styles/theme';
import { AuthProvider } from './auth';

import { ThemeProvider } from './Theme';

const AppProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
