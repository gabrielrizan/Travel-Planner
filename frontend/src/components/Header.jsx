import React from "react";
import { Box, CardMedia, Typography, Paper, Button } from "@mui/material";
import sponsor from "../assets/sponsor.png";
import Container from "@mui/material/Container";
import { Star as StarIcon } from "@mui/icons-material";

const Header = () => {
  return (
    <Container maxWidth="xl" sx={{ marginY: 4 }}>
      <Paper
        elevation={3}
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={4}
          sx={{
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Box maxWidth="60%">
            <Typography
              variant="h2"
              fontWeight="bold"
              gutterBottom
            >
              Sign in, save money
            </Typography>
            <Typography
              variant="h6"
              sx={{ mb: 4, opacity: 0.9 }}
            >
              Save 10% or more at participating properties. Just look for the blue Genius label.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<StarIcon />}
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontWeight: 'bold',
              }}
            >
              Join Now
            </Button>
          </Box>
          <CardMedia
            component="img"
            alt="Sponsor Image"
            image={sponsor}
            sx={{
              maxWidth: "350px",
              height: "350px",
              objectFit: "contain",
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default Header;
