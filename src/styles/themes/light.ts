import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#000000', 
      main: '#ffffff',   
      contrastText: '#000000', 
    },
    secondary: {
      light: '#000000', 
      main: '#bdbdbd', 
      dark: '#ffffff', 
      contrastText: '#000000', 
    },
  },
});

export { theme }