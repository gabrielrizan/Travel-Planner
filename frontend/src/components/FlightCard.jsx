import React from "react";
import { Card, Grid, Typography, Button, Box, Divider } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";

function FlightCard() {
  return (
    <Card sx={{ maxWidth: 735, p: 2, m: 2, position: "relative" }}>
      <Box sx={{ position: "absolute", top: 16, right: 16, fontSize: 14, color: "info.main" }}>2 seats left at this price</Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>Outbound: OTP → AMS</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FlightTakeoffIcon sx={{ color: "success.main" }} />
            <Typography sx={{ fontSize: 14, color: "text.secondary" }}>12:00 PM - 7:15 PM | 1 stop</Typography>
          </Box>
        </Grid>
        <Divider flexItem sx={{ my: 1, width: "100%" }} />
        <Grid item xs={12}>
          <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>Inbound: AMS → OTP</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FlightLandIcon sx={{ color: "error.main" }} />
            <Typography sx={{ fontSize: 14, color: "text.secondary" }}>9:55 PM - 10:45 AM+1 | 1 stop, Change airport</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ fontSize: 24, fontWeight: "bold", color: "success.main" }}>1,108 lei</Typography>
          <Button variant="contained" sx={{ backgroundColor: "warning.main", mt: 1 }}>
            Lock price for 11 lei
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" color="primary" fullWidth sx={{ height: "100%" }}>
            Select
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}

export default FlightCard;
