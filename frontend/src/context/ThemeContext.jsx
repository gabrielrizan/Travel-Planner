import React, { createContext, useState, useContext } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("dark");

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
