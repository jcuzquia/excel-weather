import { Autocomplete, Box, TextField } from "@mui/material";
import React, { ChangeEvent } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { useAppDispatch } from "../../../redux/store";
import { ICoordinates } from "../../../interfaces/coordinates";
import { setCoordinates } from "../../../redux/coordinatesSlice";

const GoogleMapsTextField = () => {
  const dispatch = useAppDispatch();
  const handleAddressChange = (_event: ChangeEvent<HTMLInputElement>, newInputValue: string) => {
    setValue(newInputValue);
  };

  const handleSelect = async (_event: ChangeEvent<HTMLInputElement>, newValue: string | null) => {
    setValue(newValue, false);
    clearSuggestions();
    const results = await getGeocode({ address: newValue });
    const result = await getLatLng(results[0]);
    const coordinates: ICoordinates = { lat: result.lat, lng: result.lng };
    dispatch(setCoordinates(coordinates));
  };
  const {
    ready,
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
    <Box width={"100%"} mt={2}>
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
  );
};

export default GoogleMapsTextField;
