import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  ImageList,
  ImageListItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import roomImage from "../assets/room.jpeg";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Carousel } from "react-responsive-carousel"; // Import Carousel component
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import Carousel styles

const HotelDetails = () => {
  const location = useLocation();
  const hotelDescription = location.state?.description;
  const hotelName = location.state?.name;
  const image = location.state?.image || roomImage;
  const hotelPhotos = location.state?.photos;
  const roomData = location.state?.roomData;
  const hotelAddress = location.state?.address;

  const hotel = {
    name: hotelName,
    address: hotelAddress,
    description: hotelDescription,
    facilities: ["Free Wi-Fi", "Swimming Pool", "Gym", "Restaurant"],
    photos: hotelPhotos.map((photo) => `http://cf.bstatic.com${photo}`), // Use the imported image file
  };

  // State to manage active room
  const [activeRoom, setActiveRoom] = useState(null);

  // Function to handle room selection
  const handleRoomSelect = (roomId) => {
    setActiveRoom(roomId === activeRoom ? null : roomId);
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardMedia component="img" height="400" image={hotel.photos[0]} alt={hotel.name} />
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
            <ImageList sx={{ width: "100%", height: 450 }} cols={3} rowHeight={164}>
              {hotel.photos.map((item, index) => (
                <ImageListItem key={index}>
                  <img src={`${item}?w=164&h=164&fit=crop&auto=format`} srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`} alt={hotel.name} loading="lazy" />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h6">
                  Rooms
                </Typography>
                {roomData.map((room) => (
                  <Accordion key={room.room_id} expanded={activeRoom === room.room_id} onChange={() => handleRoomSelect(room.room_id)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>{room.room_name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box>
                        <Carousel showArrows={true} showThumbs={false} showIndicators={false}>
                          {room.photos.map((photo, index) => (
                            <div key={index}>
                              <img src={photo.url_original} alt={`Room ${index + 1}`} style={{ width: "300px", height: "200px" }} /> {/* Updated line */}
                            </div>
                          ))}
                        </Carousel>
                        {/* <Typography>
                          {room.type} - {room.price} per night
                        </Typography> */}
                        <Typography>{room.description}</Typography>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
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
