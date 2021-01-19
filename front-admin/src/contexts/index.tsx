import React from 'react';

import theme from '../styles/theme';

import { ThemeProvider } from './Theme';

const AppProvider: React.FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppProvider;
