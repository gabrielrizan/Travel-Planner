import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
  Snackbar,
  Alert,
  Box,
  Chip,
  IconButton,
  Stack,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import LoadingOverlay from "./LoadingOverlay";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const HotelCard = ({ name, rating, price, image, id, checkinDate, checkoutDate, onRemove }) => {
  const apiKey = process.env.REACT_APP_RAPIDAPI_KEY;
  const navigate = useNavigate();
  const location = useLocation();
  const { user, saveStay } = useAuth();
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSeeMore = async () => {
    setLoading(true);
    try {
      const descriptionOptions = {
        method: "GET",
        url: "https://booking-com18.p.rapidapi.com/stays/get-description",
        params: { hotelId: id },
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "booking-com18.p.rapidapi.com",
        },
      };

      const descriptionResponse = await axios.request(descriptionOptions);
      const descriptionData = descriptionResponse.data.data[1] || descriptionResponse.data.data[0];
      setDescription(descriptionData.description);

      const photoOptions = {
        method: "GET",
        url: "https://booking-com18.p.rapidapi.com/stays/get-photos",
        params: { hotelId: id },
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "booking-com18.p.rapidapi.com",
        },
      };

      const photoResponse = await axios.request(photoOptions);
      let imageUrls = [];

      if (photoResponse.data.data.data[id]) {
        photoResponse.data.data.data[id].forEach((photo) => {
          let imageUrl = photo[4][25];
          imageUrls.push(imageUrl);
        });
      }

      const roomOptions = {
        method: "GET",
        url: "https://booking-com18.p.rapidapi.com/stays/room-list",
        params: {
          hotelId: id,
          checkinDate: checkinDate,
          checkoutDate: checkoutDate,
        },
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "booking-com18.p.rapidapi.com",
        },
      };

      const roomResponse = await axios.request(roomOptions);
      let roomData = [];
      let roomPrices = {};

      if (roomResponse.data.data && roomResponse.data.data.room_list) {
        roomData = roomResponse.data.data.room_list;

        roomData.forEach((room) => {
          const roomId = room.room_id;
          const block = roomResponse.data.data.block.find((block) => block.room_id === roomId);
          if (block && block.product_price_breakdown && block.product_price_breakdown.net_amount) {
            roomPrices[roomId] = block.product_price_breakdown.net_amount;
          }
        });
      }

      const addressOptions = {
        method: "GET",
        url: "https://booking-com18.p.rapidapi.com/stays/detail",
        params: {
          hotelId: id,
          checkinDate: checkinDate,
          checkoutDate: checkoutDate,
        },
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "booking-com18.p.rapidapi.com",
        },
      };

      const addressResponse = await axios.request(addressOptions);
      let address = addressResponse.data.data.address;
      let facilities = addressResponse.data.data.facilities_block.facilities || [];

      navigate(`/stays/${name}`, {
        state: {
          description: descriptionData.description,
          name: name,
          rating: rating,
          price: price,
          id: id,
          photos: imageUrls,
          roomData: roomData,
          address: address,
          roomPrices: roomPrices,
          facilities: facilities,
          checkinDate: checkinDate,
          checkoutDate: checkoutDate,
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveStay = async () => {
    setLoading(true);
    const stay = {
      id,
      name,
      rating,
      price,
      image,
      checkinDate,
      checkoutDate,
    };
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
    setLoading(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <LoadingOverlay open={loading} />
      <Card 
        sx={{ 
          maxWidth: 345,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: (theme) => theme.shadows[8],
          },
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={name}
          sx={{ 
            objectFit: "cover",
          }}
        />
        
        {/* Rating chip overlaid on image */}
        <Chip
          icon={<StarIcon sx={{ color: "white" }} />}
          label={rating}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            '& .MuiChip-icon': {
              color: '#FFD700',
            },
          }}
        />

        <CardContent sx={{ flexGrow: 1, pt: 2 }}>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="div"
            sx={{ 
              fontWeight: 600,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {name}
          </Typography>

          <Typography 
            variant="h6" 
            color="primary" 
            sx={{ 
              fontWeight: 600,
              mt: 1 
            }}
          >
            {price}
          </Typography>
        </CardContent>

        <CardActions sx={{ padding: 2, pt: 0 }}>
          <Stack 
            direction="row" 
            spacing={1} 
            sx={{ 
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Button 
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              onClick={handleSeeMore}
              sx={{
                flexGrow: 1,
                borderRadius: 2,
              }}
            >
              See More
            </Button>
            
            {user && location.pathname !== "/saved-stays" && (
              <IconButton 
                onClick={handleSaveStay}
                sx={{ 
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 2,
                }}
              >
                <FavoriteBorderIcon />
              </IconButton>
            )}
            
            {location.pathname === "/saved-stays" && (
              <IconButton 
                onClick={() => onRemove(id)}
                color="error"
                sx={{ 
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 2,
                }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            )}
          </Stack>
        </CardActions>
      </Card>

      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbarSeverity} 
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default HotelCard;
