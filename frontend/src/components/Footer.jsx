import React from "react";
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { useTheme } from "@mui/material/styles";

const Footer = () => {
  const theme = useTheme();

  const footerSections = [
    {
      title: "About",
      links: ["About Us", "Careers", "Press", "Blog"],
    },
    {
      title: "Support",
      links: ["Help Center", "Safety Center", "Community Guidelines"],
    },
    {
      title: "Legal",
      links: ["Terms of Service", "Privacy Policy", "Cookie Settings"],
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.9)" : "rgba(25, 118, 210, 0.05)",
        py: 6,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Logo and Description */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".2rem",
                mb: 2,
              }}
            >
              NeoBooking
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Discover and book your perfect stay with NeoBooking. We make travel planning easy and enjoyable.
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[faFacebookF, faTwitter, faInstagram, faLinkedinIn].map((icon, index) => (
                <IconButton
                  key={index}
                  sx={{
                    mr: 1,
                    color: "text.secondary",
                    "&:hover": {
                      color: "primary.main",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.2s",
                  }}
                >
                  <FontAwesomeIcon icon={icon} size="sm" />
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <Grid item xs={6} md={2} key={section.title}>
              <Typography variant="subtitle1" color="text.primary" gutterBottom>
                {section.title}
              </Typography>
              {section.links.map((link) => (
                <Link
                  key={link}
                  href="#"
                  color="text.secondary"
                  display="block"
                  sx={{
                    mb: 1,
                    "&:hover": {
                      color: "primary.main",
                      textDecoration: "none",
                    },
                  }}
                >
                  {link}
                </Link>
              ))}
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Copyright */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Gabi & Alex
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Made with ❤️ FILS
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
