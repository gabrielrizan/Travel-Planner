import React from "react";
import { Card, Container, Grid, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ExtendedSearchBar from "../components/ExtendedSearchBar";
import CardList from "../components/CardList";
import { useState } from "react";
import { useHotelsData } from "../context/StaysContext";

const Stays = () => {
  const [hotelsData, setHotelsData] = useHotelsData();

  const handleHotelsData = (data) => {
    setHotelsData(data);
  };

  return (
    <>
      <Navbar />
      <ExtendedSearchBar props={handleHotelsData} />
      <CardList hotelsData={hotelsData} />
    </>
  );
};

export default Stays;
