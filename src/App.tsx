// @ts-ignore
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import CalculatorForm from "./components/CalculatorForm";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '1em',
          borderRadius: '8px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#1976d2',
            },
            '&:hover fieldset': {
              borderColor: '#115293',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0d47a1',
            },
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: '2em',
          fontWeight: 500,
          marginBottom: '1em',
        },
        h2: {
          fontSize: '1.5em',
          fontWeight: 400,
          marginBottom: '1em',
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
