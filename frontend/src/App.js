import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext"; // Import the ThemeProvider
import HomePage from "./pages/HomePage";
import Stays from "./pages/Stays";
import HotelDetails from "./components/HotelDetails";
import { SearchProvider } from "./context/SearchContext";
import StaysProvider from "./context/StaysProvider";
import Flights from "./pages/Flights";
import CarRentals from "./pages/CarRentals";
import AuthForm from "./components/AuthForm";
import { AuthProvider } from "./context/AuthContext";
import SavedStays from "./components/SavedStays";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <SearchProvider>
            <StaysProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/stays/*" element={<Stays />} />
                <Route path="/stays/:hotelName/*" element={<HotelDetails />} />
                <Route path="/flights/*" element={<Flights />} />
                <Route path="/car-rentals/*" element={<CarRentals />} />
                <Route path="/login" element={<AuthForm />} />
                <Route path="/saved-stays" element={<SavedStays />} />
              </Routes>
            </StaysProvider>
          </SearchProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
