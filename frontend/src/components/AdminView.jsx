import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Button, Snackbar, Alert } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import HotelCard from "../components/HotelCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const AdminView = () => {
  const { user } = useAuth();
  const [allStays, setAllStays] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllStays = async () => {
      try {
        const staysCollection = collection(db, "users");
        const userSnapshots = await getDocs(staysCollection);
        const stays = [];

        userSnapshots.forEach((doc) => {
          const userData = doc.data();
          if (userData.savedStays) {
            userData.savedStays.forEach((stay) => {
              stays.push(stay); // No need to add userEmail here, it should already be included
            });
          }
        });

        setAllStays(stays);
      } catch (error) {
        console.error("Error fetching saved stays from all users: ", error);
        setSnackbarMessage("Error fetching saved stays. Please try again.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    };

    if (user?.email === "admin@gmail.com") {
      fetchAllStays();
    }
  }, [user]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        All Users' Saved Stays
      </Typography>
      <Button variant="contained" color="primary" startIcon={<FontAwesomeIcon icon={faHome} />} onClick={() => navigate("/")} sx={{ mb: 2 }}>
        Back Home
      </Button>
      <Grid container spacing={4}>
        {allStays.map((stay, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <HotelCard {...stay} />
            <Typography variant="body2" color="textSecondary">
              Saved by: {stay.userEmail}
            </Typography>
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

export default AdminView;
