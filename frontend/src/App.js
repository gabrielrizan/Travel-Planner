import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import darkTheme from "./theme/theme"; // Import the dark theme
import HomePage from "./pages/HomePage";
import Stays from "./pages/Stays";
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stays" element={<Stays />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
