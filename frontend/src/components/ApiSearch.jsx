import React, { useEffect, useState } from "react";
import { TextField, Autocomplete, CircularProgress } from "@mui/material";
import axios from "axios";

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

const ApiSearch = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (inputValue) => {
    if (!inputValue) {
      return;
    }

    setLoading(true);

    const options = {
      method: "GET",
      url: "https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete",
      params: {
        text: inputValue,
        languagecode: "en-us",
      },
      headers: {
        "X-RapidAPI-Key": "bbdeb2a7c5msh970fd82ef5f7d95p14ad66jsnccde857e86c8",
        "X-RapidAPI-Host": "apidojo-booking-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setOptions(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce(handleSearch, 500); // Adjust debounce delay as needed

  useEffect(() => {
    let active = true;

    if (!open) {
      setOptions([]);
    }

    if (!loading || !open) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        await handleSearch();
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, open]);

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
      renderInput={(params) => (
        <TextField
          {...params}
          label="Asynchronous"
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
  );
};

export default ApiSearch;
