import React from "react";
import { Grid, Container } from "@mui/material";
import HotelCard from "./HotelCard"; // Importing the HotelCard component

const CardList = ({ hotelsData }) => {
  return (
    <Container maxWidth="xl" sx={{ marginTop: "20px" }}>
      <Grid container spacing={4}>
        {hotelsData.map((hotel) => (
          <Grid item key={hotel.id} xs={12} sm={6} md={4} lg={3}>
            <HotelCard name={hotel.name} rating={hotel.reviewScore} price={`${hotel.priceBreakdown.grossPrice.amountRounded} ${hotel.currency}`} image={hotel.photoUrls[0]} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CardList;
