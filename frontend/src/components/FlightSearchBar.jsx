import React from "react";
import { Button, TextField, MenuItem, FormControl, InputLabel, Select, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function FlightSearchBar() {
  const theme = useTheme();

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
        <InputLabel>Trip Type</InputLabel>
        <Select label="Trip Type" defaultValue="return">
          <MenuItem value="return">Return</MenuItem>
          <MenuItem value="one-way">One-Way</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" sx={{ minWidth: 120 }}>
        <InputLabel>Class</InputLabel>
        <Select label="Class" defaultValue="economy">
          <MenuItem value="economy">Economy</MenuItem>
          <MenuItem value="business">Business</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" sx={{ minWidth: 120 }}>
        <InputLabel>Passengers</InputLabel>
        <Select label="Passengers" defaultValue={1}>
          <MenuItem value={1}>1 Passenger</MenuItem>
          <MenuItem value={2}>2 Passengers</MenuItem>
          <MenuItem value={3}>3 Passengers</MenuItem>
          <MenuItem value={4}>4 Passengers</MenuItem>
        </Select>
      </FormControl>

      <TextField label="From" variant="outlined" defaultValue="Bucharest" />
      <TextField label="To" variant="outlined" placeholder="City, airport or place" />

      <TextField label="Departure Date" type="date" InputLabelProps={{ shrink: true }} variant="outlined" />

      <TextField label="Return Date" type="date" InputLabelProps={{ shrink: true }} variant="outlined" />

      <Button variant="contained" color="primary">
        Explore
      </Button>
    </Box>
  );
}
