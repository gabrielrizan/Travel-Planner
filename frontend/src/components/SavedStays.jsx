import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Button, Snackbar, Alert } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import HotelCard from "../components/HotelCard";

const SavedStays = () => {
  const { getSavedStays, removeStay } = useAuth();
  const [savedStays, setSavedStays] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedStays = async () => {
      const stays = await getSavedStays();
      setSavedStays(stays);
    };
    fetchSavedStays();
  }, [getSavedStays]);

  const handleRemoveStay = async (stayId) => {
    const result = await removeStay(stayId);
    if (result === "success") {
      setSnackbarMessage("Stay removed successfully!");
      setSnackbarSeverity("success");
      setSavedStays((prevStays) => prevStays.filter((stay) => stay.id !== stayId));
    } else if (result === "not_found") {
      setSnackbarMessage("Stay not found!");
      setSnackbarSeverity("info");
    } else {
      setSnackbarMessage("Error removing stay. Please try again.");
      setSnackbarSeverity("error");
    }
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Saved Stays
      </Typography>
      <Button variant="contained" color="primary" startIcon={<FontAwesomeIcon icon={faHome} />} onClick={() => navigate("/")} sx={{ mb: 2 }}>
        Back Home
      </Button>
      <Grid container spacing={4}>
        {savedStays.map((stay) => (
          <Grid item key={stay.id} xs={12} sm={6} md={4}>
            <HotelCard {...stay} onRemove={handleRemoveStay} />
          </Grid>
        ))}
      </Grid>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SavedStays;
