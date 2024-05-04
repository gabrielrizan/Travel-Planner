import React from "react";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";

function Footer() {
  return (
    <Container
      component="footer"
      maxWidth={false}
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        minHeight: "13.9vh", // This ensures the footer is pushed to the bottom of the viewport
        mt: -8,
        width: "100%",
      }}
    >
      <AppBar position="relative" color="primary" sx={{ top: "auto", bottom: 0, width: "100%" }}>
        <Toolbar sx={{ justifyContent: "center", width: "100%" }}>
          <Typography variant="body1" align="center">
            © {new Date().getFullYear()} NeoBookingFILS
          </Typography>
        </Toolbar>
      </AppBar>
    </Container>
  );
}

export default Footer;
