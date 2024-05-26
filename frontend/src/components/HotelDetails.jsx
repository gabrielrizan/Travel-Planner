import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBanSmoking,
  faWifi,
  faPeopleGroup,
  faCar,
  faWheelchair,
  faVanShuttle,
  faUtensils,
  faVideo,
  faFireExtinguisher,
  faBell,
  faKey,
  faBagShopping,
  faShieldHalved,
  faElevator,
  faCouch,
  faTemperatureArrowUp,
  faPersonSwimming,
  faUmbrellaBeach,
  faDumbbell,
  faBroom,
  faSpa,
  faPaw,
  faJoint,
  faWineBottle,
  faVault,
  faVolumeXmark,
  faTree,
  faTreeCity,
} from "@fortawesome/free-solid-svg-icons";
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
  ImageList,
  ImageListItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { Star as StarIcon, LocationOn as LocationOnIcon, ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";
import roomImage from "../assets/room.jpeg";

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
  const { user, saveStay } = useAuth();

  const [activeRoom, setActiveRoom] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const getFacilityIcon = (iconName) => {
    switch (iconName) {
      case "wifi":
        return <FontAwesomeIcon icon={faWifi} />;
      case "nosmoking":
        return <FontAwesomeIcon icon={faBanSmoking} />;
      case "family":
        return <FontAwesomeIcon icon={faPeopleGroup} />;
      case "parking_sign":
        return <FontAwesomeIcon icon={faCar} />;
      case "disabled":
        return <FontAwesomeIcon icon={faWheelchair} />;
      case "shuttle":
        return <FontAwesomeIcon icon={faVanShuttle} />;
      case "snowflake":
        return <FontAwesomeIcon icon={faUtensils} />;
      case "sunglasses":
        return <FontAwesomeIcon icon={faKey} />;
      case "wind":
        return <FontAwesomeIcon icon={faFireExtinguisher} />;
      case "megaphone":
        return <FontAwesomeIcon icon={faBell} />;
      case "food_and_drink":
        return <FontAwesomeIcon icon={faUtensils} />;
      case "videochat":
        return <FontAwesomeIcon icon={faVideo} />;
      case "couch":
        return <FontAwesomeIcon icon={faCouch} />;
      case "elevator":
        return <FontAwesomeIcon icon={faElevator} />;
      case "shopping_bag":
        return <FontAwesomeIcon icon={faBagShopping} />;
      case "frontdesk":
        return <FontAwesomeIcon icon={faShieldHalved} />;
      case "heater":
        return <FontAwesomeIcon icon={faTemperatureArrowUp} />;
      case "pool":
        return <FontAwesomeIcon icon={faPersonSwimming} />;
      case "beach":
        return <FontAwesomeIcon icon={faUmbrellaBeach} />;
      case "fitness":
        return <FontAwesomeIcon icon={faDumbbell} />;
      case "clean":
        return <FontAwesomeIcon icon={faBroom} />;
      case "spa":
        return <FontAwesomeIcon icon={faSpa} />;
      case "pawprint":
        return <FontAwesomeIcon icon={faPaw} />;
      case "smoking":
        return <FontAwesomeIcon icon={faJoint} />;
      case "wine":
        return <FontAwesomeIcon icon={faWineBottle} />;
      case "safe":
        return <FontAwesomeIcon icon={faVault} />;
      case "soundproof":
        return <FontAwesomeIcon icon={faVolumeXmark} />;
      case "garden":
        return <FontAwesomeIcon icon={faTree} />;
      case "resort":
        return <FontAwesomeIcon icon={faTreeCity} />;
      default:
        return null;
    }
  };

  const hotel = {
    name: hotelName,
    address: hotelAddress,
    description: hotelDescription,
    facilities: facilities.map((facility) => ({
      icon: getFacilityIcon(facility.icon),
      text: facility.name,
    })),
    photos: hotelPhotos.map((photo) => `http://cf.bstatic.com${photo}`),
  };

  const handleRoomSelect = (roomId) => {
    setActiveRoom(roomId === activeRoom ? null : roomId);
  };

  const handleSaveStay = async () => {
    const stay = {
      id: location.state.id,
      name: hotelName,
      rating: location.state.rating,
      price: location.state.price,
      image: image,
      checkinDate: location.state.checkinDate,
      checkoutDate: location.state.checkoutDate,
    };

    if (
      stay.id !== undefined &&
      stay.name !== undefined &&
      stay.rating !== undefined &&
      stay.price !== undefined &&
      stay.image !== undefined &&
      stay.checkinDate !== undefined &&
      stay.checkoutDate !== undefined
    ) {
      const result = await saveStay(stay);
      if (result === "success") {
        setSnackbarMessage("Stay saved successfully!");
        setSnackbarSeverity("success");
      } else if (result === "exists") {
        setSnackbarMessage("Stay already saved!");
        setSnackbarSeverity("info");
      } else {
        setSnackbarMessage("Error saving stay. Please try again.");
        setSnackbarSeverity("error");
      }
      setSnackbarOpen(true);
    } else {
      console.error("Attempted to save stay with undefined field values:", stay);
      setSnackbarMessage("Error saving stay. Please ensure all stay details are provided.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
                {user && (
                  <Button variant="contained" color="primary" onClick={handleSaveStay} sx={{ mt: 2 }}>
                    Save Stay
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default HotelDetails;
