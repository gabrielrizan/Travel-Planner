import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import darkTheme from "./theme/theme"; // Import the dark theme
import HomePage from "./pages/HomePage";
import Stays from "./pages/Stays";
import StaysProvider from "./context/StaysProvider";
import HotelDetails from "./components/HotelDetails";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <StaysProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stays/*" element={<Stays />} />
            <Route path="/stays/:hotelName/*" element={<HotelDetails />} />
          </Routes>
        </StaysProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;