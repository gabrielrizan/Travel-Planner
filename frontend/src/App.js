import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import darkTheme from "./theme/theme"; // Import the dark theme
import HomePage from "./pages/HomePage";
import Stays from "./pages/Stays";
import HotelDetails from "./components/HotelDetails";
import { SearchProvider } from "./context/SearchContext"; // Import your SearchProvider
import StaysProvider from "./context/StaysProvider"; // Import your StaysProvider
import Flights from "./pages/Flights";
import CarRentals from "./pages/CarRentals";
import AuthForm from "./components/AuthForm";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import SavedStays from "./components/SavedStays";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
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
