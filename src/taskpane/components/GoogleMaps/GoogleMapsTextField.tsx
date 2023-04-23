import { Autocomplete, Box, Button, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { ICoordinates } from "../../../interfaces/coordinates";
import { setLocation } from "../../../redux/coordinatesSlice";
import { useAppDispatch } from "../../../redux/store";

const GoogleMapsTextField = () => {
  const [isSelected, setIsSelected] = useState(false);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleAddressChange = (_event: ChangeEvent<HTMLInputElement>, newInputValue: string) => {
    setValue(newInputValue);
    if (newInputValue.trim().length === 0) {
      setIsSelected(false);
    }
  };

  const handleGetQueryOptions = () => {
    console.log("Handling");
    history.push("/nrel-weather/query");
  };

  const handleSelect = async (_event: ChangeEvent<HTMLInputElement>, newValue: string | null) => {
    setValue(newValue, false);
    clearSuggestions();
    const results = await getGeocode({ address: newValue });
    const result = await getLatLng(results[0]);
    const coordinates: ICoordinates = { lat: result.lat, lng: result.lng };
    dispatch(setLocation({ coordinates, zoom: 16 }));
    setIsSelected(true);
  };
  const {
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 300 });

  let suggestions: string[];

  if (status === "OK") {
    suggestions = data.map((suggestion) => {
      const s = `${suggestion.structured_formatting.main_text}, ${suggestion.structured_formatting.secondary_text}`;
      return s;
    });
  } else {
    suggestions = [];
  }

  return (
    <Box width={"100%"} mt={2} display={"flex"} alignItems={"center"} gap={1}>
      <Box flexGrow={1}>
        <Autocomplete
          options={suggestions}
          autoHighlight
          fullWidth
          onChange={handleSelect}
          onInputChange={handleAddressChange}
          isOptionEqualToValue={(option, value) => option === value}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search..."
              value={value}
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
      </Box>
      <Box>
        <Button variant="contained" disabled={!isSelected} onClick={handleGetQueryOptions}>
          Get Data
        </Button>
      </Box>
    </Box>
  );
};

export default GoogleMapsTextField;
