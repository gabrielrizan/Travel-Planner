import React, { useState, useEffect } from "react";
import { Button, TextField, MenuItem, FormControl, InputLabel, Select, Box, CircularProgress, Autocomplete } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";

const FlightSearchBar = ({ onSearch }) => {
  const theme = useTheme();
  const apiKey = process.env.REACT_APP_RAPIDAPI_KEY;
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);
  const [tripType, setTripType] = useState("return");
  const [classType, setClassType] = useState("economy");
  const [passengers, setPassengers] = useState(1);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [inputValueFrom, setInputValueFrom] = useState("");
  const [inputValueTo, setInputValueTo] = useState("");
  const [autoCompleteOptionsFrom, setAutoCompleteOptionsFrom] = useState([]);
  const [autoCompleteOptionsTo, setAutoCompleteOptionsTo] = useState([]);
  const [loadingFrom, setLoadingFrom] = useState(false);
  const [loadingTo, setLoadingTo] = useState(false);
  const [fromId, setFromId] = useState(null);
  const [toId, setToId] = useState(null);

  const handleSearch = () => {
    const searchParams = {
      fromId: fromId,
      toId: toId,
      departureDate: departureDate,
      returnDate: returnDate,
    };
    onSearch(searchParams);
  };

  const handleFromChange = (event, newValue) => {
    setSelectedFrom(newValue);
    setFromId(newValue.id);
  };

  const handleToChange = (event, newValue) => {
    setSelectedTo(newValue);
    setToId(newValue.id);
  };

  const handleTripTypeChange = (event) => {
    setTripType(event.target.value);
    console.log("Selected Trip Type:", event.target.value);
  };

  const handleClassTypeChange = (event) => {
    setClassType(event.target.value);
    console.log("Selected Class Type:", event.target.value);
  };

  const handlePassengersChange = (event) => {
    setPassengers(event.target.value);
    console.log("Selected Passengers:", event.target.value);
  };

  const handleDepartureDateChange = (event) => {
    setDepartureDate(event.target.value);
    console.log("Selected Departure Date:", event.target.value);
  };

  const handleReturnDateChange = (event) => {
    setReturnDate(event.target.value);
    console.log("Selected Return Date:", event.target.value);
  };

  const fetchAutoCompleteOptions = async (input, setAutoCompleteOptions, setLoading, endpoint) => {
    if (!input.trim()) {
      setAutoCompleteOptions([]);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(endpoint, {
        params: { query: input },
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "booking-com18.p.rapidapi.com",
        },
      });
      const mappedOptions = response.data.data.map((item) => ({
        id: item.iataCode,
        label: `${item.city}, ${item.country}, ${item.iataCode}`,
      }));
      setAutoCompleteOptions(mappedOptions);
      console.log("AutoComplete Options:", mappedOptions);
    } catch (error) {
      console.error("Error fetching autocomplete options:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (inputValueFrom) {
        fetchAutoCompleteOptions(inputValueFrom, setAutoCompleteOptionsFrom, setLoadingFrom, "https://booking-com18.p.rapidapi.com/flights/auto-complete");
      } else {
        setAutoCompleteOptionsFrom([]);
      }
    }, 1000); // Debounce delay

    return () => clearTimeout(timeoutId);
  }, [inputValueFrom]); // Effect depends on inputValueFrom

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (inputValueTo) {
        fetchAutoCompleteOptions(inputValueTo, setAutoCompleteOptionsTo, setLoadingTo, "https://booking-com18.p.rapidapi.com/flights/auto-complete");
      } else {
        setAutoCompleteOptionsTo([]);
      }
    }, 1000); // Debounce delay

    return () => clearTimeout(timeoutId);
  }, [inputValueTo]); // Effect depends on inputValueTo

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        p: 2,
        bgcolor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[1],
      }}
    >
      <FormControl variant="outlined" sx={{ minWidth: 120 }}>
        <InputLabel id="trip-type-label">Trip Type</InputLabel>
        <Select labelId="trip-type-label" label="Trip Type" value={tripType} onChange={handleTripTypeChange}>
          <MenuItem value="return">Return</MenuItem>
          <MenuItem value="one-way">One-Way</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" sx={{ minWidth: 120 }}>
        <InputLabel id="class-label">Class</InputLabel>
        <Select labelId="class-label" label="Class" value={classType} onChange={handleClassTypeChange}>
          <MenuItem value="economy">Economy</MenuItem>
          <MenuItem value="business">Business</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" sx={{ minWidth: 120 }}>
        <InputLabel id="passenger-label">Passengers</InputLabel>
        <Select labelId="passenger-label" label="Passengers" value={passengers} onChange={handlePassengersChange}>
          <MenuItem value={1}>1 Passenger</MenuItem>
          <MenuItem value={2}>2 Passengers</MenuItem>
          <MenuItem value={3}>3 Passengers</MenuItem>
          <MenuItem value={4}>4 Passengers</MenuItem>
        </Select>
      </FormControl>

      <Autocomplete
        sx={{ width: 300 }}
        options={autoCompleteOptionsFrom}
        loading={loadingFrom}
        value={selectedFrom}
        onChange={handleFromChange}
        onInputChange={(event, newValue) => setInputValueFrom(newValue)}
        getOptionLabel={(option) => option.label || ""}
        renderInput={(params) => (
          <TextField
            {...params}
            label="From"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loadingFrom ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />

      <Autocomplete
        sx={{ width: 300 }}
        options={autoCompleteOptionsTo}
        loading={loadingTo}
        value={selectedTo}
        onChange={handleToChange}
        onInputChange={(event, newValue) => setInputValueTo(newValue)}
        getOptionLabel={(option) => option.label || ""}
        renderInput={(params) => (
          <TextField
            {...params}
            label="To"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loadingTo ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />

      <TextField label="Departure Date" type="date" value={departureDate} onChange={handleDepartureDateChange} InputLabelProps={{ shrink: true }} variant="outlined" />

      <TextField label="Return Date" type="date" value={returnDate} onChange={handleReturnDateChange} InputLabelProps={{ shrink: true }} variant="outlined" />

      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search Flights
      </Button>
    </Box>
  );
};

export default FlightSearchBar;
