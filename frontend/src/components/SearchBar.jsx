import React, { useState } from "react";
import { TextField, Container, Box } from "@mui/material";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";

function SearchBar() {
  const [calendarOpen, setCalendarOpen] = useState(false);

  const [state, setState] = useState([
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

  const handleBlur = () => {
    setCalendarOpen(false);
  };

  const formatDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return "";
    return `${format(startDate, "dd/MM/yyyy")} - ${format(endDate, "dd/MM/yyyy")}`;
  };

  return (
    <Container maxWidth="xl" sx={{ display: "flex" }}>
      <TextField id="filled-basic" label="Where are you going?" variant="outlined" placeholder="Enter your destination" sx={{ marginRight: 0.4 }} />
      <Box position="relative">
        <TextField
          id="filled-basic"
          label="Check-in date"
          variant="outlined"
          placeholder="Select check-in date"
          value={formatDateRange(state[0].startDate, state[0].endDate)}
          onClick={handleCalendarClick}
        />
        {calendarOpen && (
          <Box position="absolute" top="100%" zIndex={1}>
            <DateRange editableDateInputs={true} onChange={(item) => setState([item.selection])} moveRangeOnFirstSelection={false} ranges={state} />
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default SearchBar;
