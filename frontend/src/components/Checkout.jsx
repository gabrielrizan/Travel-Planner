import React, { useState } from "react";
import { Container, Typography, Card, CardContent, CardMedia, Box, Button, TextField, Snackbar, Alert } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user, buyStay } = useAuth(); // Use the `buyStay` method from AuthContext
  const stay = state?.stay;
  const [guestName, setGuestName] = useState(user?.displayName || "");
  const [contact, setContact] = useState(user?.email || "");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleConfirmPurchase = async () => {
    // Validate required fields
    if (!guestName || !contact) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        severity: "error",
      });
      return;
    }

    const orderDetails = {
      stayId: stay.id,
      stayName: stay.name,
      checkinDate: stay.checkinDate,
      checkoutDate: stay.checkoutDate,
      price: stay.price,
      guestName,
      contact,
      userId: user?.uid,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const result = await buyStay(orderDetails); // Save the order to Firebase
      if (result === "success") {
        setSnackbar({
          open: true,
          message: "Purchase successful! Your order has been placed.",
          severity: "success",
        });
        setTimeout(() => navigate("/orders"), 2000); // Redirect to Order History page
      } else {
        throw new Error("Failed to place the order.");
      }
    } catch (error) {
      console.error("Error confirming purchase:", error);
      setSnackbar({
        open: true,
        message: "Failed to place order. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Card elevation={3} sx={{ display: "flex", mb: 4 }}>
          <CardMedia component="img" image={stay.image} alt={stay.name} sx={{ width: "50%" }} />
          <CardContent sx={{ width: "50%", p: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {stay.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Check-in: {stay.checkinDate}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Check-out: {stay.checkoutDate}
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              Price: {stay.price}
            </Typography>
          </CardContent>
        </Card>

        <Typography variant="h6" gutterBottom>
          Guest Details
        </Typography>
        <TextField label="Guest Name" fullWidth margin="normal" value={guestName} onChange={(e) => setGuestName(e.target.value)} />
        <TextField label="Contact Information" fullWidth margin="normal" value={contact} onChange={(e) => setContact(e.target.value)} />
        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary" onClick={handleConfirmPurchase}>
            Confirm Purchase
          </Button>
        </Box>

        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default Checkout;
