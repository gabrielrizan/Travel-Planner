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

const ApiSearch = ({ onDestinationSelect }) => {
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
      url: "https://booking-com18.p.rapidapi.com/stays/auto-complete",
      params: { query: inputValue },
      headers: {
        "X-RapidAPI-Key": "bbdeb2a7c5msh970fd82ef5f7d95p14ad66jsnccde857e86c8",
        "X-RapidAPI-Host": "booking-com18.p.rapidapi.com",
      },
    };
    try {
      const response = await axios.request(options);
      const mappedOptions = response.data.data.map((item) => ({
        id: item.id,
        label: item.label,
      }));
      setOptions(mappedOptions);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce(handleSearch, 500);

  const handleDestinationSelect = (destinationId, destinationName) => {
    console.log(destinationId);
    console.log(destinationName);
    onDestinationSelect(destinationId, destinationName); // Send selected destination ID to parent component
  };

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
      onChange={(event, value) => {
        if (value) {
          handleDestinationSelect(value.id, value.label);
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
