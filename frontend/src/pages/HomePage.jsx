import React from "react";
import Navbar from "../components/Navbar";
import SecondNavbar from "../components/SecondNavbar";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
function HomePage() {
  return (
    <>
      <Navbar />
      <SecondNavbar />
      <Header />
      <SearchBar />
    </>
  );
}

export default HomePage;
