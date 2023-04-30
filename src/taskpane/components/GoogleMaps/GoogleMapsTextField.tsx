import { Autocomplete, Box, TextField } from "@mui/material";
import React, { ChangeEvent, FC, useEffect } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { ICoordinates } from "../../../interfaces/coordinates";
import { clearCoordinates, selectMapState, setAddress, setLocation } from "../../../redux/coordinatesSlice";
import { clearResponse } from "../../../redux/nrelQuerySlice";
import { useAppDispatch, useTypedSelector } from "../../../redux/store";

interface Props {
  isError: boolean;
  error?: string | unknown;
}

const GoogleMapsTextField: FC<Props> = ({ isError, error }) => {
  const { address } = useTypedSelector(selectMapState);
  const dispatch = useAppDispatch();

  const {
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 300 });

  const handleAddressChange = (_event: ChangeEvent<HTMLInputElement>, newInputValue: string) => {
    console.log("calling input change", newInputValue.length);
    if (newInputValue.trim().length === 0) {
      dispatch(clearCoordinates());
      dispatch(clearResponse());
    }
    setValue(newInputValue);
  };

  useEffect(() => {
    setValue(address);
  }, []);

  const handleSelect = async (_event: ChangeEvent<HTMLInputElement>, newValue: string | null) => {
    setValue(newValue, false);
    clearSuggestions();
    const results = await getGeocode({ address: newValue });
    const result = await getLatLng(results[0]);
    const coordinates: ICoordinates = { lat: result.lat, lng: result.lng };
    dispatch(setLocation({ coordinates, zoom: 16, address: value }));
    dispatch(setAddress(newValue));
  };

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
    <Box flexGrow={1}>
      <Autocomplete
        options={suggestions}
        value={value}
        autoHighlight
        fullWidth
        onChange={handleSelect}
        onInputChange={handleAddressChange}
        isOptionEqualToValue={(option, value) => {
          return option === value;
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search..."
            value={value}
            size="small"
            margin="dense"
            error={isError}
            helperText={error}
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
