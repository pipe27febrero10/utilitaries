import React from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import BsonToJsonImage from '../assets/images/bson-to-json.webp';
import JsonToExcelImage from '../assets/images/json-to-excel.webp';
import RutGeneratorImage from '../assets/images/rut-generator.webp';
import RucGeneratorImage from '../assets/images/ruc-generator.webp';

const tools = [
    { title: "BSON to JSON converter", image: BsonToJsonImage, path: "/bson-to-json", alt: "BSON to JSON converter image"},
    { title: "JSON to Excel", image: JsonToExcelImage, path: "/json-to-excel", alt: "JSON to Excel image"},
    { title: "RUC generator", image: RucGeneratorImage, path: "/ruc-generator", alt: "RUC generator image"},
    { title: "RUT generator", image: RutGeneratorImage, path: "/rut-generator", alt: "RUT generator image"}
  ];

  const StyledLink = styled(Link)({
    textDecoration: 'none',
  });

const HomePage = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar >
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Utilitaries
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h4" style={{marginTop: 12}} gutterBottom>
          Utilitaries
        </Typography>
        <Grid container spacing={4}>
          {tools.map((tool, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
             <StyledLink to={tool.path}>
              <Card >
                <CardMedia
                  component="img"
                  alt={tool.alt}
                  height="140"
                  image={tool.image}
                  title={tool.title}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {tool.title}
                  </Typography>
                </CardContent>
              </Card>
              </StyledLink>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
