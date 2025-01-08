import React, { useState, useEffect } from "react";
import { Container, Grid, Card, CardMedia, CardContent, Typography, Box, Rating, Chip, IconButton, CircularProgress, Button, Snackbar, Alert } from "@mui/material";
import { LocationOn, Delete as DeleteIcon, Info as InfoIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const SavedStays = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, getSavedStays, removeStay } = useAuth();
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const fetchSavedStays = async () => {
      try {
        const savedStays = await getSavedStays();
        console.log("Fetched stays:", savedStays);
        setStays(savedStays || []);
      } catch (err) {
        console.error("Error fetching saved stays:", err);
        setError("Failed to load saved stays");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchSavedStays();
    }
  }, [user, getSavedStays]);

  const handleRemoveStay = async (stayId) => {
    try {
      const result = await removeStay(stayId);
      if (result === "success") {
        setStays((prevStays) => prevStays.filter((stay) => stay.id !== stayId));
        setSnackbar({
          open: true,
          message: "Stay removed successfully",
          severity: "success",
        });
      }
    } catch (err) {
      console.error("Error removing stay:", err);
      setSnackbar({
        open: true,
        message: "Failed to remove stay",
        severity: "error",
      });
    }
  };

  const handleViewDetails = (stayId) => {
    navigate(`/hotels/${stayId}`);
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
          <CircularProgress />
        </Box>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
          <Typography color="error">{error}</Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {!stays || stays.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh",
            }}
          >
            <Typography variant="h5" color="text.secondary">
              No saved stays yet. Start exploring hotels to save your favorites!
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {stays.map((stay) => (
              <Grid item xs={12} md={6} lg={4} key={stay.id}>
                <Card
                  elevation={2}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: theme.shadows[8],
                    },
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <CardMedia component="img" height="240" image={stay.image} alt={stay.name} sx={{ objectFit: "cover" }} />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        display: "flex",
                        gap: 1,
                      }}
                    >
                      <Chip label="Hotel" color="primary" size="small" sx={{ bgcolor: "rgba(25, 118, 210, 0.9)" }} />
                    </Box>
                    <IconButton
                      onClick={() => handleRemoveStay(stay.id)}
                      sx={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        bgcolor: "rgba(255, 255, 255, 0.9)",
                        "&:hover": {
                          bgcolor: "rgba(255, 255, 255, 1)",
                          color: theme.palette.error.main,
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom component="div">
                      {stay.name}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Rating value={stay.rating / 2} precision={0.5} readOnly />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        {stay.rating}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Check-in: {stay.checkinDate}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Check-out: {stay.checkoutDate}
                      </Typography>
                    </Box>

                    <Box sx={{ mt: "auto", pt: 2 }}>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Price per night
                      </Typography>
                      <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
                        {stay.price.replace("USD", "RON")} RON
                      </Typography>
                    </Box>

                    <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={() => handleViewDetails(stay.id)} startIcon={<InfoIcon />}>
                      View Details
                    </Button>
                    <Button variant="contained" color="secondary" fullWidth sx={{ mt: 2 }} onClick={() => navigate(`/checkout/${stay.id}`, { state: { stay } })}>
                      Buy Now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default SavedStays;
