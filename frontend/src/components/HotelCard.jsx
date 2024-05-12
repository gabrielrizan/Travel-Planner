import React from "react";
import { Card, CardContent, Typography, CardActions, Button, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const HotelCard = ({ name, rating, price, image, id, checkinDate, checkoutDate }) => {
  const apiKey = process.env.REACT_APP_RAPIDAPI_KEY;
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);

  const handleSeeMore = async () => {
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

      // console.log(id);
      const photoResponse = await axios.request(photoOptions);
      //  console.log(photoResponse);
      //  console.log(photoResponse.data.data.data[id]);
      let imageUrls = [];

      photoResponse.data.data.data[id].forEach((photo) => {
        let imageUrl = photo[4][25];
        imageUrls.push(imageUrl);
      });

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
      let roomData = roomResponse.data.data.room_list;
      const roomPrices = {};

      // Extract price for each room
      roomData.forEach((room) => {
        const roomId = room.room_id;
        const block = roomResponse.data.data.block.find((block) => block.room_id === roomId);
        if (block && block.product_price_breakdown && block.product_price_breakdown.net_amount) {
          roomPrices[roomId] = block.product_price_breakdown.net_amount;
        }
      });

      console.log(roomData);
      console.log(roomPrices);

      const addressOptions = {
        method: "GET",
        url: "https://booking-com18.p.rapidapi.com/stays/detail",
        params: {
          hotelId: id,
          checkinDate: checkinDate,
          checkoutDate: checkoutDate,
        },
        headers: {
          "X-RapidAPI-Key": "bbdeb2a7c5msh970fd82ef5f7d95p14ad66jsnccde857e86c8",
          "X-RapidAPI-Host": "booking-com18.p.rapidapi.com",
        },
      };

      const addressResponse = await axios.request(addressOptions);
      let address = addressResponse.data.data.address;
      let facilities = addressResponse.data.data.facilities_block.facilities;
      console.log("Facilities: ", facilities);
      console.log("Address: ", address);
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
        },
      });
      console.log(description);
      // console.log(photos);
    } catch (error) {
      console.error(error);
    }
  };

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
        <Button size="small" onClick={handleSeeMore}>
          See More
        </Button>
      </CardActions>
    </Card>
  );
};

export default HotelCard;
