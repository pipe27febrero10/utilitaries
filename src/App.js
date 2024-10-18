import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import HomePage from './pages/HomePage';
import BSONToJSON from './components/BSONToJSON';
import JSONToExcel from './components/JSONToExcel';
import RUCGenerator from './components/RUCGenerator/RUCGenerator';
import RUTGenerator from './components/RUTGenerator/RUTGenerator';
import MongoIdGenerator from './components/MongoIdGenerator/MongoIdGenerator';
import JSONToExcelFileUpload from './components/JSONToExcelFileUpload/JSONToExcelFileUpload';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1B5EE4',
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
          <Route path="/mongo-id-generator" element={<MongoIdGenerator/>} />
          <Route path="/file-json-to-excel" element={<JSONToExcelFileUpload/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;