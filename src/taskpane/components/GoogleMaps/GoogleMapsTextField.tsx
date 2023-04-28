import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { ChangeEvent, useEffect, useState } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { excelWeatherQueryApi } from "../../../api/excel-weatherApi";
import { NRELResponseQuery } from "../../../interfaces/NRELQuery";
import { ICoordinates } from "../../../interfaces/coordinates";
import { selectMapState, setAddress, setLocation } from "../../../redux/coordinatesSlice";
import { responseSuccess } from "../../../redux/nrelQuerySlice";
import { useAppDispatch, useTypedSelector } from "../../../redux/store";
import { selectUser } from "../../../redux/userSlice";

const GoogleMapsTextField = () => {
  const [isSelected, setIsSelected] = useState(false);
  const user = useTypedSelector(selectUser);
  const { coordinates, address } = useTypedSelector(selectMapState);
  const dispatch = useAppDispatch();

  const {
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 300 });

  const { error, isError, refetch } = useQuery({
    queryKey: ["queryData"],
    queryFn: async () => {
      console.log("started quering data");
      const { data, status } = await excelWeatherQueryApi.get(
        `nsrdb_data_query.json?api_key=${user.nrelAPIKey}&lat=${coordinates?.lat}&lon=${coordinates?.lng}`
      );
      console.log(status);
      const nrelQueryData = data as NRELResponseQuery;
      dispatch(responseSuccess(nrelQueryData));

      return null;
    },
    enabled: false,
  });

  const handleAddressChange = (_event: ChangeEvent<HTMLInputElement>, newInputValue: string) => {
    if (newInputValue.trim().length < 1) {
      setIsSelected(false);
    }
    setValue(newInputValue);
  };

  const handleGetQueryOptions = () => {
    refetch();
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
    // const coordinates: ICoordinates = { lat: 80, lng: 41 };
    dispatch(setLocation({ coordinates, zoom: 16, address: value }));
    dispatch(setAddress(newValue));
    setIsSelected(true);
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
    <Box width={"100%"} mt={2} display={"flex"} alignItems={"center"} gap={1}>
      <Box flexGrow={1}>
        <Autocomplete
          options={suggestions}
          value={value}
          autoHighlight
          fullWidth
          onChange={handleSelect}
          onInputChange={handleAddressChange}
          isOptionEqualToValue={(option, value) => {
            setIsSelected(option === value);
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
      <Box>
        <Button variant="contained" onClick={handleGetQueryOptions} disabled={!isSelected}>
          Get Data
        </Button>
      </Box>
    </Box>
  );
};

export default GoogleMapsTextField;
