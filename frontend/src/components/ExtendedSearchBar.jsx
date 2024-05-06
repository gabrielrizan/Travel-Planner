import React, { useState, useEffect } from "react";
import { TextField, Container, Box, Popover, IconButton, Typography, Button } from "@mui/material";
import { DateRange } from "react-date-range";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import axios from "axios";
import ApiSearch from "./ApiSearch";
import { useNavigate, useLocation } from "react-router-dom";
import { useSearchContext } from "../context/SearchContext";

function SearchBar({ props }) {
  const apiKey = process.env.REACT_APP_RAPIDAPI_KEY;
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { searchState, setSearchState } = useSearchContext();
  const { destinationId, dateRange, selections, searchTriggered, destinationName } = searchState;

  const popoverId = popoverOpen ? "simple-popover" : undefined;

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
      return;
    }

    setSearchState((prevSearchState) => ({
      ...prevSearchState,
      selections: {
        ...prevSearchState.selections,
        [type]: operation === "increment" ? prevSearchState.selections[type] + 1 : Math.max(prevSearchState.selections[type] - 1, type === "children" ? 0 : 1),
      },
    }));
  };

  const formatDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return "";
    return `${format(startDate, "dd/MM/yyyy")} - ${format(endDate, "dd/MM/yyyy")}`;
  };

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (searchTriggered && destinationId) {
      handleSearch(); // Trigger search when destinationId is available
      setSearchState((prevSearchState) => ({ ...prevSearchState, searchTriggered: false })); // Reset searchTriggered state
    }
  }, [destinationId, searchTriggered]);

  const handleSearch = async () => {
    if (!destinationId) {
      console.log("Please select a destination first.");
      console.log(destinationId);
      return;
    }

    const formattedCheckinDate = format(dateRange[0].startDate, "yyyy-MM-dd");
    const formattedCheckoutDate = format(dateRange[0].endDate, "yyyy-MM-dd");

    const options = {
      method: "GET",
      url: "https://booking-com18.p.rapidapi.com/stays/search",
      params: {
        locationId: destinationId,
        checkinDate: formattedCheckinDate,
        checkoutDate: formattedCheckoutDate,
        rooms: selections.rooms,
        adults: selections.adults,
        currencyCode: "RON",
      },
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "booking-com18.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);

      const searchData = {
        data: response.data.data,
        checkInDate: formattedCheckinDate,
        checkOutDate: formattedCheckoutDate,
      };

      props(searchData); // Send data to parent component
      console.log(searchData);
      //if pathname isn't /stays redirect to stays use react router
      if (location.pathname !== "/stays") {
        navigate("/stays");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDestinationSelect = (selectedDestinationId, selectedDestinationName) => {
    setSearchState((prevSearchState) => ({ ...prevSearchState, destinationId: selectedDestinationId, destinationName: destinationName }));
    console.log(selectedDestinationId, selectedDestinationName, destinationName, destinationId);
  };

  return (
    <Container maxWidth="xl" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <ApiSearch onDestinationSelect={handleDestinationSelect} />
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
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setSearchState((prevSearchState) => ({ ...prevSearchState, dateRange: [item.selection] }))}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
            />
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
