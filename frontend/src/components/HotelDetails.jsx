import React from "react";
import { Container, Grid, Typography, Card, CardMedia, CardContent, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import roomImage from "../assets/room.jpeg";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
const HotelDetails = () => {
  const location = useLocation();
  const hotelDescription = location.state?.description || "No description available";
  const hotelName = location.state?.name;
  const image = location.state?.image || roomImage;

  const hotel = {
    name: hotelName,
    address: "123 Main St, City, Country",
    description: hotelDescription,
    facilities: ["Free Wi-Fi", "Swimming Pool", "Gym", "Restaurant"],
    rooms: [
      { id: 1, type: "Standard Room", price: "$100" },
      { id: 2, type: "Deluxe Room", price: "$150" },
      { id: 3, type: "Suite", price: "$250" },
    ],
    reviews: [
      { id: 1, content: "Great hotel, loved the amenities!" },
      { id: 2, content: "Good location, friendly staff." },
      { id: 3, content: "Room was clean and comfortable." },
    ],
    photos: [image], // Use the imported image file
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardMedia component="img" height="250" image={hotel.photos[0]} alt={hotel.name} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {hotel.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {hotel.address}
                </Typography>
                {hotel.description && <Typography sx={{ my: 2 }}>{hotel.description}</Typography>}
                {!hotel.description && <Typography sx={{ my: 2 }}>No description available</Typography>}
                <List>
                  {hotel.facilities.map((facility) => (
                    <ListItem key={facility}>
                      <ListItemIcon>
                        <StarIcon />
                      </ListItemIcon>
                      <ListItemText primary={facility} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography gutterBottom variant="h6">
                  Rooms & Availability
                </Typography>
                {hotel.rooms.map((room) => (
                  <Typography key={room.id}>
                    {room.type} - {room.price} per night
                  </Typography>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h6">
                  Reviews
                </Typography>
                {hotel.reviews.map((review) => (
                  <Typography key={review.id} paragraph>
                    {review.content}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HotelDetails;