import React from "react";
import { Container, Typography, Button, TextField, Box } from "@mui/material";
import { generateRUTs } from "../utils/generators";

const RUTGenerator = () => {
  const [rut, setRut] = React.useState("");

  const handleRUTGenerator = () => {
    const newRut = generateRUTs(1);
    setRut(newRut);
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
        Generate a unique RUT
      </Typography>
      <Typography variant="body1" gutterBottom>
        A RUT is a unique identifier for a Chilean citizen or resident. It is
        used for various official and legal purposes, such as taxation and
        identification. You can generate a new RUT as needed.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleRUTGenerator}
        sx={{
          borderRadius: "9999px",
          height: "40px",
          textTransform: "none",
          margin: 2,
        }}
      >
        Generate RUT
      </Button>
      <Box sx={{ width: "100%", marginTop: 3 }}>
        <Typography variant="body1" gutterBottom>
          Generated RUT
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          value={rut}
          InputProps={{
            readOnly: true,
          }}
          sx={{ backgroundColor: "#f0f2f4", borderRadius: "12px" }}
        />
      </Box>
    </Container>
  );
};

export default RUTGenerator;
