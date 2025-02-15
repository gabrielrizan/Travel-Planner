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
import AdminView from "./components/AdminView";
import AdminRoute from "./components/AdminRoute";
import Checkout from "./components/Checkout";
import OrderHistory from "./components/OrderHistory";

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
                <Route path="/checkout/:stayId" element={<Checkout />} />
                <Route path="/orders" element={<OrderHistory />} />
                <Route
                  path="/admin-view"
                  element={
                    <AdminRoute>
                      <AdminView />
                    </AdminRoute>
                  }
                />
              </Routes>
            </StaysProvider>
          </SearchProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
