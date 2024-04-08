import React from "react";
import Navbar from "../components/Navbar";
import SecondNavbar from "../components/SecondNavbar";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import Trending from "../components/Trending";
function HomePage() {
  return (
    <>
      <Navbar />
      <SecondNavbar />
      <Header />
      <SearchBar />
      <Trending />
    </>
  );
}

export default HomePage;
