import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import HomePage from './pages/HomePage';
import BSONToJSON from './components/BSONToJSON';
import JSONToExcel from './components/JSONToExcel';
import RUCGenerator from './components/RUCGenerator';
import RUTGenerator from './components/RUTGenerator';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1C80E4',
    },
    secondary: {
      main: '#ff5722',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/bson-to-json" element={<BSONToJSON/>} />
          <Route path="/json-to-excel" element={<JSONToExcel/>} />
          <Route path="/ruc-generator" element={<RUCGenerator/>} />
          <Route path="/rut-generator" element={<RUTGenerator/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;