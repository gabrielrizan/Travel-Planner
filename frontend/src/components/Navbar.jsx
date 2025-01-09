import React, { useState } from "react";
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Container, Avatar, Badge, Tooltip, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useThemeContext } from "../context/ThemeContext";
import { Brightness4 as DarkIcon, Brightness7 as LightIcon, AccountCircle, Logout, Settings, Dashboard, Hotel as HotelIcon, Warning as WarningIcon } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faPlane, faCar, faBuilding, faHeart } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout, getSavedStays, isAdmin } = useAuth(); // Added isAdmin
  const { mode, toggleTheme } = useThemeContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [savedStaysCount, setSavedStaysCount] = useState(0);

  React.useEffect(() => {
    const fetchSavedStays = async () => {
      if (user) {
        const stays = await getSavedStays();
        setSavedStaysCount(stays.length);
      }
    };
    fetchSavedStays();
  }, [user, getSavedStays]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    handleClose();
    navigate("/");
  };

  return (
    <AppBar position="sticky" color="default">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            NeoBooking
          </Typography>

          <Box sx={{ flexGrow: 1, display: "flex", gap: 2 }}>
            <Button color="inherit" startIcon={<FontAwesomeIcon icon={faBed} />} onClick={() => navigate("/stays")}>
              Stays
            </Button>
            <Button color="inherit" startIcon={<FontAwesomeIcon icon={faPlane} />} onClick={() => navigate("/flights")}>
              Flights
            </Button>
            <Button color="inherit" startIcon={<FontAwesomeIcon icon={faCar} />} onClick={() => navigate("/car-rentals")}>
              Car Rentals
            </Button>
            <Button color="inherit" startIcon={<FontAwesomeIcon icon={faBuilding} />} onClick={() => navigate("/attractions")}>
              Attractions
            </Button>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === "dark" ? <LightIcon /> : <DarkIcon />}
            </IconButton>

            {isLoggedIn ? (
              <>
                <Badge badgeContent={savedStaysCount} color="primary">
                  <IconButton color="inherit" onClick={() => navigate("/saved-stays")}>
                    <FontAwesomeIcon icon={faHeart} />
                  </IconButton>
                </Badge>

                <Badge color="secondary">
                  <IconButton color="inherit" onClick={() => navigate("/orders")}>
                    <FontAwesomeIcon icon={faBuilding} />
                  </IconButton>
                </Badge>

                <Tooltip title="Account settings">
                  <IconButton onClick={handleMenu} color="inherit">
                    <Avatar sx={{ width: 32, height: 32 }}>{user?.email?.charAt(0).toUpperCase()}</Avatar>
                  </IconButton>
                </Tooltip>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                    },
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <AccountCircle sx={{ mr: 2 }} /> Profile
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Settings sx={{ mr: 2 }} /> Settings
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/admin")}>
                    <Dashboard sx={{ mr: 2 }} /> Dashboard
                  </MenuItem>
                  {isAdmin && (
                    <>
                      <Divider />
                      <MenuItem onClick={() => navigate("/admin-view?tab=stays")}>
                        <HotelIcon sx={{ mr: 2 }} /> View All Saved Stays
                      </MenuItem>
                      <MenuItem onClick={() => navigate("/admin-view?tab=orders")}>
                        <WarningIcon sx={{ mr: 2 }} /> View All Orders
                      </MenuItem>
                    </>
                  )}
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <Logout sx={{ mr: 2 }} /> Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button variant="outlined" onClick={() => navigate("/login")}>
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
