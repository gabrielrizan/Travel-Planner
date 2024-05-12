import React from "react";
import FlightCard from "./FlightCard"; // Ensure you import FlightCard correctly based on your file structure
import { Box } from "@mui/material";

// Dummy flight data
const flights = [
  {
    id: 1,
    type: "Outbound",
    from: "OTP (Coandă International)",
    duration: "3h 05m",
    direct: "Direct",
    to: "AMS 6:55 pm",
    inboundType: "Inbound",
    inboundFrom: "AMS 9:55 pm",
    inboundDuration: "11h 50m (1 stop)",
    inboundTo: "OTP 10:45 am +1",
    price: "1,130 lei",
    lockPrice: "113 lei",
    seatsLeft: "1 seat left at this price",
  },
  {
    id: 2,
    type: "Outbound",
    from: "LAX (Los Angeles)",
    duration: "11h 30m",
    direct: "1 stop",
    to: "NRT 9:00 am",
    inboundType: "Inbound",
    inboundFrom: "NRT 11:00 pm",
    inboundDuration: "10h 45m (1 stop)",
    inboundTo: "LAX 8:00 am +1",
    price: "2,500 lei",
    lockPrice: "250 lei",
    seatsLeft: "2 seats left at this price",
  },
];

export default function FlightsList() {
  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      {flights.map((flight) => (
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
    </Box>
  );
}
