// @ts-ignore
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import CalculatorForm from "./components/CalculatorForm";

const theme = createTheme({
  palette: {
    primary: {
      main: '#008dca',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          fontFamily: "kern, ss01, ss05, ss07",
          marginBottom: '1em',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontFamily: 'WoltHeading-Omnes, Roboto, Arial, sans-serif',
          fontSize: '1.5em',
          fontWeight: 400,
          marginBottom: '0.7em',
        },
        h2: {
          fontFamily: 'WoltHeading-Omnes, Roboto, Arial, sans-serif',
          fontSize: '1.5em',
          fontWeight: 300,
          color: '#009de0',
          textAlign: 'left',
          marginBottom: '0.5em',
        },
      },
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CalculatorForm />
      </div>
    </ThemeProvider>
  );
}

export default App;
