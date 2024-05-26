import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHotel, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Badge, Fade } from "@mui/material"; // Import the Fade component
import { useThemeContext } from "../context/ThemeContext"; // Import the ThemeContext

export default function ButtonAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { isLoggedIn, user, logout, getSavedStays } = useAuth();
  const [savedStaysCount, setSavedStaysCount] = React.useState(0);
  const { mode, toggleTheme } = useThemeContext(); // Use the ThemeContext

  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  React.useEffect(() => {
    const fetchSavedStays = async () => {
      if (user) {
        const stays = await getSavedStays();
        setSavedStaysCount(stays.length);
      }
    };
    fetchSavedStays();
  }, [user, getSavedStays]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
  };

  const navigate = useNavigate();

  console.log("isLoggedIn:", isLoggedIn);
  console.log("User:", user);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            NeoBooking
          </Typography>
          <IconButton onClick={toggleTheme} color="inherit">
            <Fade in={mode === "dark"} timeout={300}>
              <FontAwesomeIcon icon={faSun} />
            </Fade>
            <Fade in={mode === "light"} timeout={300}>
              <FontAwesomeIcon icon={faMoon} />
            </Fade>
          </IconButton>
          {isLoggedIn ? (
            <Box display="flex" alignItems="center">
              <Button
                color="inherit"
                startIcon={
                  <Badge badgeContent={savedStaysCount} color="secondary">
                    <FontAwesomeIcon icon={faHotel} />
                  </Badge>
                }
                sx={{ textTransform: "none", fontWeight: "bold", mr: 2 }}
                onClick={() => navigate("/saved-stays")}
              >
                Saved Stays
              </Button>
              <Typography variant="body1" sx={{ mr: 2 }}>
                {user?.displayName || "User"}
              </Typography>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user?.displayName || "User"} src={user?.photoURL || "/static/images/avatar/2.jpg"} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={setting === "Logout" ? handleLogout : handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Button color="inherit" onClick={handleLogin}>
              Login
              <FontAwesomeIcon icon={faUser} style={{ marginLeft: "8px" }} />
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
