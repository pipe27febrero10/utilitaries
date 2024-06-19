import React from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import BsonToJsonImage from '../assets/images/bson-to-json.jpg';
import JsonToExcelImage from '../assets/images/json-to-excel.png';

const tools = [
    { title: "BSON to JSON converter", image: BsonToJsonImage, path: "/bson-to-json" },
    { title: "JSON to Excel", image: JsonToExcelImage, path: "/json-to-excel" },
    { title: "RUC generator", image: "https://cdn.usegalileo.ai/stability/64807295-de39-4bce-99b3-3a7a0b3e2bee.png", path: "/ruc-generator" },
    { title: "RUT generator", image: "https://cdn.usegalileo.ai/stability/e384938b-5d08-452c-9730-0596ed6111ef.png", path: "/rut-generator" }
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
                  alt={tool.title}
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
