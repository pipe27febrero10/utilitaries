import React from 'react';
import { Container, Typography, Button, TextField, Box } from '@mui/material';
import { generateRUC } from '../../utils/generators';

const RUCGenerator = () => {
  const [ruc, setRuc] = React.useState('');

  const handleGenerateRUC = () => {
    const newRuc = generateRUC();
    setRuc(newRuc);
  };

  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        textAlign: "center",
        padding: 4
      }}
    >
      <Typography variant="h4" gutterBottom>
        Generate a unique RUC
      </Typography>
      <Typography variant="body1" gutterBottom>
        A RUC is a unique identifier for a user. It can be used to query the API
        or to add a user to a Mailchimp audience. You can generate a new RUC at
        any time.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGenerateRUC}
        sx={{
          borderRadius: "9999px",
          height: "40px",
          textTransform: "none",
          margin: 2,
        }}
      >
        Generate RUC
      </Button>
      <Box sx={{ width: "100%", marginTop: 3 }}>
        <Typography variant="body1" gutterBottom>
          Generated RUC
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          value={ruc}
          InputProps={{
            readOnly: true,
          }}
          sx={{ backgroundColor: "#f0f2f4", borderRadius: "12px" }}
        />
      </Box>
    </Container>
  );
};

export default RUCGenerator;