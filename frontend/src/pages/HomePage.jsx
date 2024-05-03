import React from "react";
import Navbar from "../components/Navbar";
import SecondNavbar from "../components/SecondNavbar";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import Trending from "../components/Trending";
import Footer from "../components/Footer";
import ExtendedSearchBar from "../components/ExtendedSearchBar";
import { useState } from "react";
import { useHotelsData } from "../context/StaysContext";

function HomePage() {
  const [hotelsData, setHotelsData] = useHotelsData();

  const handleHotelsData = (data) => {
    setHotelsData(data);
  };

  return (
    <>
      <Navbar />
      <SecondNavbar />
      <Header />
      <ExtendedSearchBar props={handleHotelsData} />
      <Trending />
      <Footer />
    </>
  );
}

export default HomePage;
