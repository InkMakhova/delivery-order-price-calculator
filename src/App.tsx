import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import DeliveryOrderCalculator from "./pages/DeliveryOrderCalculator";

const theme = createTheme({
  palette: {
    primary: {
      main: "#008dca",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          minWidth: 300,
          maxWidth: 600,
          width: "50%"
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          marginBottom: "1em"
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          // minWidth: 200,
          textAlign: "left",
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontFamily: "kern, ss01, ss05, ss07",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontFamily: "WoltHeading-Omnes, Roboto, Arial, sans-serif",
          fontSize: "1.5em",
          fontWeight: 400,
          textAlign: "center",
          margin: "0 auto"
        },
        h2: {
          fontFamily: "WoltHeading-Omnes, Roboto, Arial, sans-serif",
          fontSize: "1.5em",
          fontWeight: 300,
          color: "#009de0",
          textAlign: "left",
          marginBottom: "0.5em",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          paddingLeft: "1.5em",
          paddingRight: "1.5em",
          borderRadius: "5rem",
          textTransform: "none",
          fontWeight: 600,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none"
          }
        },
      }
    }
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <DeliveryOrderCalculator />
      </div>
    </ThemeProvider>
  );
}

export default App;
