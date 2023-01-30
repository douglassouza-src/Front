import { ThemeProvider } from '@mui/material';
import React from 'react';
import { AppRoutes } from './AppRoutes';
import { GlobalStyle } from './config';
import {theme} from './styles/themes/light';

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <GlobalStyle />      
        <AppRoutes />
      </ThemeProvider>                   
    </React.Fragment>
  )
}

export default App;