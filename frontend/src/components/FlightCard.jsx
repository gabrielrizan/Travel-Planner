import React from "react";
import { Card, CardContent, Typography, Button, Box, Chip } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function FlightCard({ outboundType, seatsLeft, from, duration, direct, to, inboundType, inboundFrom, inboundDuration, inboundTo, price, lockPrice }) {
  return (
    <Card sx={{ maxWidth: 1100, my: 2, mx: "auto", boxShadow: 3 }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="subtitle1" component="div">
            {outboundType}
          </Typography>
          <Chip label={seatsLeft} color="primary" size="small" />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FlightTakeoffIcon />
            <Typography variant="h6" component="div" sx={{ mx: 1 }}>
              {from}
            </Typography>
            <Typography variant="body2" component="div">
              {duration}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography variant="h6" component="div">
              {direct}
            </Typography>
            <Typography variant="h6" component="div">
              {to}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
          <Typography variant="subtitle1" component="div">
            {inboundType}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FlightLandIcon />
            <Typography variant="h6" component="div" sx={{ mx: 1 }}>
              {inboundFrom}
            </Typography>
            <AccessTimeIcon sx={{ mx: 1 }} />
            <Typography variant="body2" component="div">
              {inboundDuration}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography variant="h6" component="div">
              {inboundTo}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
          <Typography variant="h5" color="text.secondary">
            {price}
          </Typography>
          <Button variant="outlined" color="primary">
            Lock price for {lockPrice}
          </Button>
          <Button variant="contained" color="primary">
            Select
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
