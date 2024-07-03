import React, { useState } from 'react';
import { Container, Typography, Button, Box, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { deserialize } from 'bson';

const Root = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
  padding: theme.spacing(4),
}));

const UploadButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1C80E4',
  color: '#111418',
  textTransform: 'none',
  margin: theme.spacing(2, 0),
  borderRadius: '9999px',
  height: '40px',
  width: '100%',
  '&:hover': {
    backgroundColor: '#1565C0',
  },
}));

const DownloadButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#f0f2f4',
  color: '#111418',
  textTransform: 'none',
  borderRadius: '9999px',
  height: '32px',
  '&:hover': {
    backgroundColor: '#e0e0e0',
  },
}));

const FileInfo = styled(Box)(({ theme }) => ({
  backgroundColor: '#f0f2f4',
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
  width: '100%',
}));

const BSONToJSON = () => {
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [jsonData, setJsonData] = useState(null);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setFileSize((file.size / (1024 * 1024)).toFixed(2) + ' MB'); // Size in MB

      const reader = new FileReader();
      reader.onload = function(e) {
        const arrayBuffer = e.target.result;
        const buffer = new Uint8Array(arrayBuffer);
        
        try {
          const deserializedData = [];
          let offset = 0;
          while (offset < buffer.length) {
            const bsonSize = buffer[offset] | (buffer[offset + 1] << 8) | (buffer[offset + 2] << 16) | (buffer[offset + 3] << 24);
            const bsonData = buffer.slice(offset, offset + bsonSize);
            deserializedData.push(deserialize(bsonData));
            offset += bsonSize;
          }
          setJsonData(JSON.stringify(deserializedData, null, 4));
        } catch (err) {
          console.error('Error deserializing BSON data:', err);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleDownload = () => {
    if (jsonData) {
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName.replace('.bson', '.json');
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <Root>
      <Container maxWidth="md">
        <Typography variant="h5" gutterBottom>
          Upload a .bson file
        </Typography>
        <Typography variant="body1" gutterBottom>
          A .bson file is a binary representation of a JSON-like document. It's often used as the input format for MongoDB's import/export tools.
        </Typography>
        <input
          accept=".bson"
          style={{ display: 'none' }}
          id="upload-button"
          type="file"
          onChange={handleUpload}
        />
        <label htmlFor="upload-button">
          <UploadButton variant="contained" component="span">
            Upload .bson file
          </UploadButton>
        </label>
        {fileName && (
          <>
            <Typography variant="h5" gutterBottom>
              Download your .json file
            </Typography>
            <FileInfo>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f0f2f4',
                      borderRadius: '12px',
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path
                        d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"
                      ></path>
                    </svg>
                  </Box>
                </Grid>
                <Grid item xs>
                  <Typography variant="body1" noWrap>
                    {fileName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" noWrap>
                    Size: {fileSize}
                  </Typography>
                </Grid>
                <Grid item>
                  <DownloadButton variant="contained" onClick={handleDownload}>
                    Download
                  </DownloadButton>
                </Grid>
              </Grid>
            </FileInfo>
          </>
        )}
      </Container>
    </Root>
  );
};

export default BSONToJSON;
