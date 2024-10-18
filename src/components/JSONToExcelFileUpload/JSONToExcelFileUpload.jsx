import React, { useState } from "react";
import { Container, Typography, Button, TextField, InputAdornment, IconButton } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from "@mui/system";
import { utils, writeFile } from "xlsx";
import * as yup from "yup";
import { flatten } from "flat";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Root = styled("div")(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fff",
  padding: theme.spacing(4),
}));

const ConvertButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#007bff",
  color: "#fff",
  textTransform: "none",
  borderRadius: "9999px",
  height: "40px",
  marginTop: theme.spacing(2),
  "&:hover": {
    backgroundColor: "#0056b3",
  },
  width: "100%",
}));

const JSONToExcelFileUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const jsonSchema = yup
    .array()
    .of(yup.object().typeError("Each item in the array must be an object"));

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const handleConvert = async () => {
    if (!file) {
      setError("Please upload a JSON file");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target.result);
        await jsonSchema.validate(json);

        const flattenedJsonArray = json.map((item) => flatten(item));

        const worksheet = utils.json_to_sheet(flattenedJsonArray);
        const workbook = utils.book_new();

        utils.book_append_sheet(workbook, worksheet, "Sheet1");
        writeFile(workbook, "converted_excel.xlsx");
        setError("");
      } catch (e) {
        if (e.name === "ValidationError") {
          setError(
            "Invalid JSON format: Please provide a valid JSON array of objects"
          );
        } else {
          setError("Invalid JSON: Please ensure your input is a valid JSON array");
        }
        console.error("Invalid JSON", e);
      }
    };
    reader.onerror = () => {
      setError("Failed to read file");
    };
    reader.readAsText(file);
  };

  return (
    <Root>
      <Container maxWidth="md"><Typography variant="h4" gutterBottom>
          Transform JSON file to Excel
        </Typography>
        <Typography variant="body1" gutterBottom>
          Upload a JSON file to create a new transformation
        </Typography>
        <TextField
        variant="outlined"
        value={file ? file.name : 'No file selected'}
        fullWidth
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <input
                type="file"
                accept=".json"
                style={{ display: 'none' }}
                id="file-input"
                onChange={handleFileChange}
              />
              <label htmlFor="file-input">
                <IconButton component="span">
                  <ArrowDropDownIcon />
                </IconButton>
              </label>
            </InputAdornment>
          ),
        }}
      />
        <ConvertButton
          variant="contained"
          component="label"
          startIcon={<CloudUploadIcon />}
        >
          Upload files
          <VisuallyHiddenInput
            type="file"
            accept=".json"
            onChange={handleFileChange}
          />
        </ConvertButton>
        {error && (
          <Typography variant="body2" color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <ConvertButton variant="contained" onClick={handleConvert} fullWidth>
          Convert to Excel
        </ConvertButton>
      </Container>
    </Root>
  );
};

export default JSONToExcelFileUpload;
