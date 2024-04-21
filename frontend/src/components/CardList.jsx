import React, { useState } from "react";
import { Grid, Container } from "@mui/material";
import HotelCard from "./HotelCard";

const CardList = () => {
  const [hotels] = useState([
    {
      hotel_name: "Hotel 1",
      rating: 4.5,
      lowest_price: 100,
      currency_code: "USD",
    },
    {
      hotel_name: "Hotel 2",
      rating: 4.0,
      lowest_price: 80,
      currency_code: "USD",
    },
    {
      hotel_name: "Hotel 3",
      rating: 3.5,
      lowest_price: 60,
      currency_code: "USD",
    },
  ]);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        {hotels.map((hotel, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <HotelCard name={hotel.hotel_name} rating={hotel.rating} price={`${hotel.lowest_price} ${hotel.currency_code}`} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CardList;
