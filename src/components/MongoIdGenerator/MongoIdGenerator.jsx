import React from "react";
import { Container, Typography, Button, TextField, Box, IconButton, InputAdornment, Snackbar } from "@mui/material";
import { generateMongoId } from "../../utils/generators";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const MongoIdGenerator = () => {
  const [mongoId, setMongoId] = React.useState("");
  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  const handleMongoIdGenerator = () => {
    const id = generateMongoId();
    setMongoId(id);
  };

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  const copyToClipboard = () => {
    if(!mongoId) return;
    navigator.clipboard.writeText(mongoId);
    setOpenSnackBar(true);
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
        padding: 4,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Generate Mongo ID
      </Typography>
      <Typography variant="body1" gutterBottom>
        A MongoDB ObjectId is a unique identifier used in MongoDB databases. It
        consists of 12 bytes and is generated automatically when a new document
        is created. The ObjectId is used for uniquely identifying documents and
        can also be generated as needed for specific use cases.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleMongoIdGenerator}
        sx={{
          borderRadius: "9999px",
          height: "40px",
          textTransform: "none",
          margin: 2,
        }}
      >
        Generate MongoId
      </Button>
      <Box sx={{ width: "100%", marginTop: 3 }}>
        <Typography variant="body1" gutterBottom>
          Generated MongoId
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          value={mongoId}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={copyToClipboard} aria-label="copy"><ContentCopyIcon></ContentCopyIcon></IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ backgroundColor: "#f0f2f4", borderRadius: "12px" }}
        />
      </Box>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        message="MongoId copied to clipboard"></Snackbar>
    </Container>
  );
};

export default MongoIdGenerator;
