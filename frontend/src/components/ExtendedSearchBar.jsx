import React, { useState } from "react";
import { TextField, Container, Box, Popover, IconButton, Typography, Button } from "@mui/material";
import { DateRange } from "react-date-range";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import axios from "axios";

function SearchBar() {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selections, setSelections] = useState({
    adults: 1,
    children: 0,
    rooms: 1,
  });
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  const [destination, setDestination] = useState(""); // State to store destination text

  const popoverId = popoverOpen ? "simple-popover" : undefined; // Move popoverId declaration here

  const handleCalendarClick = (event) => {
    event.preventDefault();
    setCalendarOpen(!calendarOpen);
  };

  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
    setPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };

  const handleSelectionChange = (type, operation) => {
    if (type === "children" && operation === "decrement" && selections.children === 0) {
      return; // Don't allow decrementing children below 0
    }

    setSelections((prev) => ({
      ...prev,
      [type]: operation === "increment" ? prev[type] + 1 : Math.max(prev[type] - 1, type === "children" ? 0 : 1),
    }));
  };

  const formatDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return "";
    return `${format(startDate, "dd/MM/yyyy")} - ${format(endDate, "dd/MM/yyyy")}`;
  };

  const handleSearch = () => {
    // Make the API request here using the destination state
    axios({
      method: "GET",
      url: "https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete",
      params: {
        text: destination,
        languagecode: "en-us",
      },
      headers: {
        "X-RapidAPI-Key": "bbdeb2a7c5msh970fd82ef5f7d95p14ad66jsnccde857e86c8",
        "X-RapidAPI-Host": "apidojo-booking-v1.p.rapidapi.com",
      },
    })
      .then((response) => {
        console.log(response.data); // Handle the response data as needed
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <Container maxWidth="xl" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <TextField
        id="destination-input"
        label="Where are you going?"
        variant="outlined"
        placeholder="Enter your destination"
        sx={{ marginRight: 0.4, width: "400px" }}
        value={destination}
        onChange={(e) => setDestination(e.target.value)} // Update destination state
      />
      <Box position="relative" sx={{ marginRight: 0.4 }}>
        <TextField
          id="date-range-input"
          label="Check-in date"
          variant="outlined"
          placeholder="Select check-in date"
          value={formatDateRange(dateRange[0].startDate, dateRange[0].endDate)}
          onClick={handleCalendarClick}
          sx={{ width: "400px" }}
        />
        {calendarOpen && (
          <Box position="absolute" top="100%" zIndex={1}>
            <DateRange editableDateInputs={true} onChange={(item) => setDateRange([item.selection])} moveRangeOnFirstSelection={false} ranges={dateRange} />
          </Box>
        )}
      </Box>
      <TextField
        id="guests-input"
        label="Guests"
        variant="outlined"
        value={`${selections.adults} ${selections.adults > 1 ? "adults" : "adult"} · ${selections.children} children · ${selections.rooms} ${selections.rooms > 1 ? "rooms" : "room"}`}
        sx={{ marginRight: 0.4, width: "400px" }}
        onClick={handlePopoverClick}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <IconButton onClick={handlePopoverClick}>
              <AddIcon />
            </IconButton>
          ),
        }}
      />
      <Popover
        id={popoverId}
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box p={2}>
          {Object.entries(selections).map(([key, value]) => (
            <Box key={key} display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography>{key.charAt(0).toUpperCase() + key.slice(1)}</Typography>
              <IconButton onClick={() => handleSelectionChange(key, "decrement")}>
                <RemoveIcon />
              </IconButton>
              <Typography>{value}</Typography>
              <IconButton onClick={() => handleSelectionChange(key, "increment")}>
                <AddIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Popover>
      <Button variant="contained" color="primary" sx={{ height: "56px" }} onClick={handleSearch}>
        Search
      </Button>
    </Container>
  );
}

export default SearchBar;
