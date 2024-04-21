import React from "react";
import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";

const HotelCard = ({ name, rating, price }) => {
  return (
    <Card sx={{ maxWidth: 345, marginBottom: 20 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {rating}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Book Now</Button>
      </CardActions>
    </Card>
  );
};

export default HotelCard;
