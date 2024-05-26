import React from "react";
import { Box, CardMedia, Typography } from "@mui/material";
import logo from "../assets/logo.png";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Header = () => {
  return (
    <Container maxWidth="xl">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h3">Sign in, save money</Typography>
          <Typography variant="h5">Save 10% or more at participating properties. Just look for the blue Genius label.</Typography>
        </Box>
        <CardMedia component="img" alt="Sponsor Image" image={logo} style={{ maxWidth: "300px", height: "300px" }} />
      </Box>
    </Container>
  );
};

export default Header;
