import React from "react";
import { Card, CardContent, Typography, CardActions, Button, CardMedia } from "@mui/material";

const HotelCard = ({ name, rating, price, image }) => {
  return (
    <Card sx={{ maxWidth: 345, height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia component="img" height="140" image={image} alt={name} sx={{ objectFit: "cover" }} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
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
