import { Autocomplete, Box, TextField } from "@mui/material";
import React, { ChangeEvent, FC } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import { useNRELApiStore } from "../../../stores/nrel-api/nrel-api.store";
import { usePlacesStore } from "../../../stores/places/places.store";
import { useMapStore } from "../../../stores/map/map.store";

interface Props {
  isError: boolean;
  error?: string | unknown;
}

const GoogleMapsTextField: FC<Props> = ({ isError, error }) => {
  const clearCoordinates = usePlacesStore((state) => state.clearCoordinates);
  const fetchSelectedCoordinates = usePlacesStore((state) => state.fetchSelectedCoordinates);
  const setNRELResponseQuery = useNRELApiStore((state) => state.setNRELResponseQuery);
  const setZoom = useMapStore((state) => state.setZoom);
  const removeMarkerFromMap = useMapStore((state) => state.removeMarkerFromMap);

  const {
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 300 });

  const handleAddressChange = (_event: ChangeEvent<HTMLInputElement>, newInputValue: string) => {
    console.log("handle address change");
    if (newInputValue.trim().length === 0) {
      clearCoordinates();
      setNRELResponseQuery(undefined);
      setZoom(1);
    } else {
      setValue(newInputValue);
      setZoom(1);
    }
  };

  const handleSelect = async (_event: ChangeEvent<HTMLInputElement>, newValue: string | null) => {
    console.log("handle selectChange");
    setValue(newValue, false);
    clearSuggestions();
    if (newValue.trim().length > 0) {
      setZoom(17);
    } else {
      setZoom(1);
      removeMarkerFromMap();
    }
    setNRELResponseQuery(undefined);
    fetchSelectedCoordinates(newValue);
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
        isOptionEqualToValue={(_option, _value) => {
          return false;
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
              autoComplete: "Address", // disable autocomplete and autofill
            }}
          />
        )}
      />
    </Box>
  );
};

export default GoogleMapsTextField;
