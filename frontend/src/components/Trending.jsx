import React from "react";
import { Grid, Card, CardMedia, Typography, Container, Box, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { TrendingUp } from "@mui/icons-material";
import bucharestImage from "../assets/bucharest.jpg";
import brasovImage from "../assets/brasov.jpg";
import clujImage from "../assets/cluj.jpg";
import istanbulImage from "../assets/istanbul.jpg";
import sibiuImage from "../assets/sibiu.jpg";
import roFlagImage from "../assets/roflag.png";
import tuFlagImage from "../assets/tuflag.png";

const TrendingDestinations = () => {
  const theme = useTheme();

  const destinations = [
    { name: "Bucharest", imageUrl: bucharestImage, countryFlag: roFlagImage },
    { name: "Brașov", imageUrl: brasovImage, countryFlag: roFlagImage },
    { name: "Cluj-Napoca", imageUrl: clujImage, countryFlag: roFlagImage },
    { name: "Istanbul", imageUrl: istanbulImage, countryFlag: tuFlagImage },
    { name: "Sibiu", imageUrl: sibiuImage, countryFlag: roFlagImage },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Box mb={4} display="flex" alignItems="center">
        <TrendingUp
          sx={{
            fontSize: 40,
            mr: 2,
            color: theme.palette.primary.main,
          }}
        />
        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{
              background: theme.palette.mode === "dark" ? "linear-gradient(45deg, #fff 30%, #f5f5f5 90%)" : "linear-gradient(45deg, #1a237e 30%, #283593 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Trending destinations
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ fontStyle: "italic" }}>
            Most popular choices for travellers from Romania
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {destinations.slice(0, 2).map((destination, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card
              sx={{
                position: "relative",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.02)",
                  "& img": {
                    transform: "scale(1.1)",
                  },
                },
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
            >
              <CardMedia
                component="img"
                alt={destination.name}
                height="380"
                image={destination.imageUrl}
                sx={{
                  transition: "transform 0.3s ease-in-out",
                  transform: "scale(1.05)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                  padding: 3,
                }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="h5" component="div" color="white" fontWeight="bold" sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>
                    {destination.name}
                  </Typography>
                  <img
                    src={destination.countryFlag}
                    alt="Country flag"
                    style={{
                      width: "24px",
                      filter: "drop-shadow(2px 2px 2px rgba(0,0,0,0.3))",
                    }}
                  />
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}

        {/* Similar styling for the remaining destinations */}
        {destinations.slice(2).map((destination, index) => (
          <Grid item xs={12} sm={6} md={4} key={index + 2}>
            <Card
              sx={{
                position: "relative",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.02)",
                  "& img": {
                    transform: "scale(1.1)",
                  },
                },
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
            >
              <CardMedia
                component="img"
                alt={destination.name}
                height="280"
                image={destination.imageUrl}
                sx={{
                  transition: "transform 0.3s ease-in-out",
                  transform: "scale(1.05)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                  padding: 3,
                }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="h5" component="div" color="white" fontWeight="bold" sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>
                    {destination.name}
                  </Typography>
                  <img
                    src={destination.countryFlag}
                    alt="Country flag"
                    style={{
                      width: "24px",
                      filter: "drop-shadow(2px 2px 2px rgba(0,0,0,0.3))",
                    }}
                  />
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TrendingDestinations;
