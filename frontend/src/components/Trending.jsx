import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Container } from "@mui/material";
import bucharestImage from "../assets/bucharest.jpg";
import brasovImage from "../assets/brasov.jpg";
import clujImage from "../assets/cluj.jpg";
import istanbulImage from "../assets/istanbul.jpg";
import sibiuImage from "../assets/sibiu.jpg";
import roFlagImage from "../assets/roflag.png";
import tuFlagImage from "../assets/tuflag.png";

const TrendingDestinations = () => {
  const destinations = [
    { name: "Bucharest", imageUrl: bucharestImage, countryFlag: roFlagImage },
    { name: "Brașov", imageUrl: brasovImage, countryFlag: roFlagImage },
    { name: "Cluj-Napoca", imageUrl: clujImage, countryFlag: roFlagImage },
    { name: "Istanbul", imageUrl: istanbulImage, countryFlag: tuFlagImage },
    { name: "Sibiu", imageUrl: sibiuImage, countryFlag: roFlagImage },
  ];

  return (
    <Container maxWidth="xl" sx={{ paddingTop: "40px" }}>
      <Typography variant="h5" gutterBottom>
        Trending destinations
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Most popular choices for travellers from Romania
      </Typography>
      <Grid container spacing={3}>
        {destinations.slice(0, 2).map((destination, index) => (
          // For larger screens, this will take half the width of the row, forcing a 2-column layout
          <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
            <Card>
              <CardMedia component="img" alt={destination.name} height="140" image={destination.imageUrl} />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {destination.name}
                </Typography>
                <img src={destination.countryFlag} alt="Country flag" style={{ width: "20px" }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
        {destinations.slice(2).map((destination, index) => (
          // For larger screens, this will take one-third the width of the row, allowing for a 3-column layout
          <Grid item xs={12} sm={4} md={4} lg={4} key={index + 2}>
            <Card>
              <CardMedia component="img" alt={destination.name} height="140" image={destination.imageUrl} />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {destination.name}
                </Typography>
                <img src={destination.countryFlag} alt="Country flag" style={{ width: "20px" }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TrendingDestinations;
