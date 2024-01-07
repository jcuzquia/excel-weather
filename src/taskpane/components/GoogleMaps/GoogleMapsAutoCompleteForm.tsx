import { Box, Button } from "@mui/material";
import React from "react";
import { selectMapState } from "../../../redux/coordinatesSlice";
import { useTypedSelector } from "../../../redux/store";
import { useNRELApiStore } from "../../../stores/nrel-api/nrel-api.store";
import { usePlacesStore } from "../../../stores/places/places.store";
import { useUserStore } from "../../../stores/user/user.store";
import GoogleMapsTextField from "./GoogleMapsTextField";

export const GoogleMapsAutoCompleteForm = () => {
  const user = useUserStore((state) => state.user);
  const error = usePlacesStore((state) => state.error);
  const selectedLocation = usePlacesStore((state) => state.selectedLocation);
  const clearCoordinates = usePlacesStore((state) => state.clearCoordinates);

  const fetchNRELResponseQuery = useNRELApiStore((state) => state.fetchNRELResponseQuery);

  const handleGetQueryOptions = () => {
    fetchNRELResponseQuery(selectedLocation);
  };

  return (
    <Box width={"100%"} display={"flex"} alignItems={"center"} gap={1} paddingLeft={1} paddingRight={1}>
      <GoogleMapsTextField error={error?.message} isError={!!error} />
      <Box>
        <Button
          variant="contained"
          size="small"
          onClick={handleGetQueryOptions}
          disabled={selectedLocation ? false : true}
        >
          Get Data
        </Button>
      </Box>
    </Box>
  );
};
