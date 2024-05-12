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
  IconButton,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WifiIcon from "@mui/icons-material/Wifi";
import PoolIcon from "@mui/icons-material/Pool";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Carousel } from "react-responsive-carousel"; // Import Carousel component
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import Carousel styles
import roomImage from "../assets/room.jpeg";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew"; // Import the icon
import WeekendIcon from "@mui/icons-material/Weekend";
import ShutterSpeedIcon from "@mui/icons-material/ShutterSpeed";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import LuggageIcon from "@mui/icons-material/Luggage";
import CameraOutdoorIcon from "@mui/icons-material/CameraOutdoor";

const HotelDetails = () => {
  const location = useLocation();
  const hotelDescription = location.state?.description;
  const hotelName = location.state?.name;
  const image = location.state?.image || roomImage;
  const hotelPhotos = location.state?.photos;
  const roomData = location.state?.roomData;
  const hotelAddress = location.state?.address;
  const roomPrices = location.state?.roomPrices;
  const facilities = location.state?.facilities;

  const getFacilityIcon = (iconName) => {
    switch (iconName) {
      case "wifi":
        return <WifiIcon />;
      case "couch":
        return <WeekendIcon />;
      case "instantconf":
        return <ShutterSpeedIcon />;
      case "frontdesk":
        return <ContactPhoneIcon />;
      case "cabin_trolley":
        return <LuggageIcon />;
      case "concierge":
        return <RoomServiceIcon />;
      case "videochat":
        return <CameraOutdoorIcon />;
    }
  };

  const hotel = {
    name: hotelName,
    address: hotelAddress,
    description: hotelDescription,
    facilities: facilities.map((facility, index) => ({
      icon: getFacilityIcon(facility.icon), // You need to define getFacilityIcon function
      text: facility.name,
    })),
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
                <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                  <LocationOnIcon sx={{ mr: 1 }} /> {hotel.address}
                </Typography>
                {hotel.description && <Typography sx={{ my: 2 }}>{hotel.description}</Typography>}
                {!hotel.description && <Typography sx={{ my: 2 }}>No description available</Typography>}
                <List sx={{ "& .MuiListItem-root": { padding: 0 } }}>
                  {hotel.facilities.map((facility, index) => (
                    <ListItem key={index} disableGutters>
                      <ListItemIcon>{facility.icon}</ListItemIcon>
                      <ListItemText primary={facility.text} />
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
                              <img src={photo.url_original} alt={`Room ${index + 1}`} style={{ width: "300px", height: "200px" }} />
                            </div>
                          ))}
                        </Carousel>
                        {roomPrices && roomPrices[room.room_id] && <Typography sx={{ marginTop: 1, marginBottom: 1 }}>{`Price: ${roomPrices[room.room_id].amount_rounded} per night`}</Typography>}
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
