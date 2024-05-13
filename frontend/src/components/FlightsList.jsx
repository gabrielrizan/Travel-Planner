import React, { useState, useEffect } from "react";
import FlightCard from "./FlightCard"; // Ensure you import FlightCard correctly based on your file structure
import { Container } from "@mui/material";
import axios from "axios";
import FlightSearchBar from "./FlightSearchBar";

const FlightsList = () => {
  const [searchResults, setSearchResults] = useState([]);
  const apiKey = process.env.REACT_APP_RAPIDAPI_KEY;

  useEffect(() => {}, [searchResults]); // Log searchResults whenever it changes

  // Function to handle flight search
  const handleFlightSearch = async (searchParams) => {
    try {
      const options = {
        method: "GET",
        url: "https://booking-com18.p.rapidapi.com/flights/search-return",
        params: searchParams,
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "booking-com18.p.rapidapi.com",
        },
      };

      // Make API request
      const response = await axios.request(options);
      console.log("Flight search results:", response.data.data);
      // Extract flight data from API response and update state
    } catch (error) {
      console.error("Error searching for flights:", error);
    }
  };

  return (
    <Container sx={{ maxWidth: "100%", mt: 1 }}>
      {/* Pass handleFlightSearch function to FlightSearchBar component */}
      <FlightSearchBar onSearch={handleFlightSearch} />
      {/* Display search results */}
      {searchResults.map((flight) => (
        <FlightCard
          key={flight.id}
          type={flight.type}
          from={flight.from}
          duration={flight.duration}
          direct={flight.direct}
          to={flight.to}
          inboundType={flight.inboundType}
          inboundFrom={flight.inboundFrom}
          inboundDuration={flight.inboundDuration}
          inboundTo={flight.inboundTo}
          price={flight.price}
          lockPrice={flight.lockPrice}
          seatsLeft={flight.seatsLeft}
        />
      ))}
    </Container>
  );
};

export default FlightsList;
