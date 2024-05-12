import React from "react";
import Navbar from "../components/Navbar";
import FlightSearchBar from "../components/FlightSearchBar";
import FlightsList from "../components/FlightsList";

export default function Flights() {
  return (
    <>
      <Navbar />
      <FlightSearchBar />
      <FlightsList />
    </>
  );
}
