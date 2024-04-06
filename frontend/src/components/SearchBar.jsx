import React, { useState } from "react";
import { TextField, Container, Box, Popover, IconButton, Typography } from "@mui/material";
import { DateRange } from "react-date-range";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";

function SearchBar() {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // Define state for the number of adults, children, and rooms
  const [selections, setSelections] = useState({
    adults: 2,
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

  const handleBlur = () => {
    setCalendarOpen(false);
    setPopoverOpen(false);
  };

  // Function to handle incrementing and decrementing selection values
  const handleSelectionChange = (type, operation) => {
    setSelections((prev) => ({
      ...prev,
      [type]: operation === "increment" ? prev[type] + 1 : Math.max(prev[type] - 1, 0),
    }));
  };

  const formatDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return "";
    return `${format(startDate, "dd/MM/yyyy")} - ${format(endDate, "dd/MM/yyyy")}`;
  };

  const popoverId = popoverOpen ? "simple-popover" : undefined;

  return (
    <Container maxWidth="xl" sx={{ display: "flex", alignItems: "center" }}>
      <TextField id="destination-input" label="Where are you going?" variant="outlined" placeholder="Enter your destination" sx={{ marginRight: 0.4 }} />
      <Box position="relative" sx={{ marginRight: 0.4 }}>
        <TextField
          id="date-range-input"
          label="Check-in date"
          variant="outlined"
          placeholder="Select check-in date"
          value={formatDateRange(dateRange[0].startDate, dateRange[0].endDate)}
          onClick={handleCalendarClick}
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
        sx={{ marginRight: 0.4, width: "300px" }}
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
    </Container>
  );
}

export default SearchBar;
