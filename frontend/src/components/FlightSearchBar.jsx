import React, { useState, useEffect } from "react";
import { Button, TextField, MenuItem, FormControl, InputLabel, Select, Box, CircularProgress, Autocomplete } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";

const FlightSearchBar = () => {
  const theme = useTheme();
  const apiKey = process.env.REACT_APP_RAPIDAPI_KEY;
  const [from, setFrom] = useState(null); // Initially no selection
  const [to, setTo] = useState("");
  const [tripType, setTripType] = useState("return");
  const [classType, setClassType] = useState("economy");
  const [passengers, setPassengers] = useState(1);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [inputValue, setInputValue] = useState(""); // Track the input value for debouncing
  const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFromChange = (event, newValue) => {
    setFrom(newValue);
  };

  const fetchAutoCompleteOptions = async (input) => {
    if (!input.trim()) {
      setAutoCompleteOptions([]);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get("https://booking-com18.p.rapidapi.com/flights/auto-complete", {
        params: { query: input },
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "booking-com18.p.rapidapi.com",
        },
      });
      const mappedOptions = response.data.data.map((item) => ({
        id: item.id, // Unique identifier
        label: `${item.city}, ${item.country}, ${item.cityCode}`,
      }));
      setAutoCompleteOptions(mappedOptions);
    } catch (error) {
      console.error("Error fetching autocomplete options:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (inputValue) {
        fetchAutoCompleteOptions(inputValue);
      } else {
        setAutoCompleteOptions([]);
      }
    }, 1000); // Debounce delay

    return () => clearTimeout(timeoutId);
  }, [inputValue]); // Effect depends on inputValue

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
        <Select labelId="trip-type-label" label="Trip Type" value={tripType} onChange={(e) => setTripType(e.target.value)}>
          <MenuItem value="return">Return</MenuItem>
          <MenuItem value="one-way">One-Way</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" sx={{ minWidth: 120 }}>
        <InputLabel id="class-label">Class</InputLabel>
        <Select labelId="class-label" label="Class" value={classType} onChange={(e) => setClassType(e.target.value)}>
          <MenuItem value="economy">Economy</MenuItem>
          <MenuItem value="business">Business</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" sx={{ minWidth: 120 }}>
        <InputLabel id="passenger-label">Passengers</InputLabel>
        <Select labelId="passenger-label" label="Passengers" value={passengers} onChange={(e) => setPassengers(e.target.value)}>
          <MenuItem value={1}>1 Passenger</MenuItem>
          <MenuItem value={2}>2 Passengers</MenuItem>
          <MenuItem value={3}>3 Passengers</MenuItem>
          <MenuItem value={4}>4 Passengers</MenuItem>
        </Select>
      </FormControl>

      <Autocomplete
        sx={{ width: 300 }}
        options={autoCompleteOptions}
        loading={loading}
        value={from}
        onChange={handleFromChange}
        onInputChange={(event, newValue) => setInputValue(newValue)}
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
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />

      <TextField label="To" variant="outlined" placeholder="City, airport, or place" value={to} onChange={(e) => setTo(e.target.value)} />

      <TextField label="Departure Date" type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} InputLabelProps={{ shrink: true }} variant="outlined" />

      <TextField label="Return Date" type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} InputLabelProps={{ shrink: true }} variant="outlined" />

      <Button variant="contained" color="primary">
        Search Flights
      </Button>
    </Box>
  );
};

export default FlightSearchBar;
