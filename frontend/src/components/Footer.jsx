import React from "react";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";

function Footer() {
  return (
    <AppBar position="static" sx={{ top: "auto", bottom: 0, marginTop: "20px" }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography variant="body1" align="center">
            © {new Date().getFullYear()} NeoBooking
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Footer;
