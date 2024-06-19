import React, { useState } from 'react';
import { Container, Typography, Button, TextField } from '@mui/material';
import { styled } from '@mui/system';
import * as XLSX from 'xlsx';
import * as yup from 'yup';
import { flatten } from 'flat';

const Root = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
  padding: theme.spacing(4),
}));

const ConvertButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#007bff',
  color: '#fff',
  textTransform: 'none',
  borderRadius: '9999px',
  height: '40px',
  marginTop: theme.spacing(2),
  '&:hover': {
    backgroundColor: '#0056b3',
  },
}));

const JSONToExcel = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');

  const jsonSchema = yup.array().of(
    yup.object().typeError('Each item in the array must be an object')
  );


  const handleConvert = async () => {
    try {
      const json = JSON.parse(jsonInput);
      await jsonSchema.validate(json);

      const flattenedJsonArray = json.map(item => flatten(item));

      const worksheet = XLSX.utils.json_to_sheet(flattenedJsonArray);
      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      XLSX.writeFile(workbook, 'converted_excel.xlsx');
      setError('');
    } catch (e) {
        if (e.name === 'ValidationError') {
            setError('Invalid JSON format: Please provide a valid JSON array of objects');
          } else {
            setError('Invalid JSON: Please ensure your input is a valid JSON array');
          }
           console.error('Invalid JSON', e);
    }
  };

  return (
    <Root>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          New Transformation
        </Typography>
        <Typography variant="body1" gutterBottom>
          Create a new transformation from a JSON object
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          multiline
          rows={10}
          placeholder="Paste your JSON here"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          sx={{ marginTop: 2, marginBottom: 2 }}
          error={!!error}
          helperText={error}
        />
        <ConvertButton variant="contained" onClick={handleConvert} fullWidth>
          Convert to Excel
        </ConvertButton>
      </Container>
    </Root>
  );
};

export default JSONToExcel;
