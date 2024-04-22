import React from "react";
import { Grid, Container } from "@mui/material";
import HotelCard from "./HotelCard"; // Importing the HotelCard component

// Function to modify the image URL to the desired resolution
const changeImageResolution = (url, newResolution) => {
  return url.replace("square60", newResolution);
};

const CardList = ({ hotelsData }) => {
  return (
    <Container maxWidth="xl" sx={{ marginTop: "20px" }}>
      <Grid container spacing={4}>
        {hotelsData.map((hotel) => (
          <Grid item key={hotel.id} xs={12} sm={6} md={4} lg={3}>
            {/* Using max500 as the new resolution for images */}
            <HotelCard
              name={hotel.name}
              rating={hotel.reviewScore}
              price={`${hotel.priceBreakdown.grossPrice.amountRounded} ${hotel.currency}`}
              image={changeImageResolution(hotel.photoUrls[0], "max500")}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CardList;