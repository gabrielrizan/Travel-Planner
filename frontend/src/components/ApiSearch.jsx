import React, { useState, useEffect } from "react";
import { TextField, Autocomplete, CircularProgress } from "@mui/material";
import axios from "axios";

const sleep = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

const ApiSearch = ({ onDestinationSelect }) => {
  const apiKey = process.env.REACT_APP_RAPIDAPI_KEY;
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (inputValue) => {
    if (!inputValue) {
      setOptions([]); // Clear options if input is empty
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get("https://booking-com18.p.rapidapi.com/stays/auto-complete", {
        params: { query: inputValue },
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "booking-com18.p.rapidapi.com",
        },
      });
      const mappedOptions = response.data.data.map((item) => ({
        id: item.id,
        label: item.label,
      }));
      setOptions(mappedOptions);
    } catch (error) {
      console.error("Error fetching autocomplete options:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce(handleSearch, 1000);

  useEffect(() => {
    let active = true;

    const fetchOptions = async (inputValue) => {
      if (!open || !inputValue) {
        setOptions([]);
        return;
      }
      await sleep(1000); // For demo purposes.
      if (active) {
        await handleSearch(inputValue);
      }
    };

    fetchOptions();

    return () => {
      active = false;
    };
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.label}
      options={options}
      loading={loading}
      onInputChange={(event, newInputValue) => {
        debouncedSearch(newInputValue);
      }}
      onChange={(event, value) => {
        if (value) {
          onDestinationSelect(value.id, value.label);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Where do you want to go?"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading && <CircularProgress color="inherit" size={20} />}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default ApiSearch;
