import React from "react";
import { Card, Container, Grid, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ExtendedSearchBar from "../components/ExtendedSearchBar";
import CardList from "../components/CardList";

const Stays = () => {
  return (
    <>
      <Navbar />
      <ExtendedSearchBar />
      <CardList />
    </>
  );
};

export default Stays;
