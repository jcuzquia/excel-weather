import { Box, Typography } from "@mui/material";
import GoogleMapReact from "google-map-react";
import React from "react";
import { usePlacesStore } from "../../../stores/places/places.store";
import { useMapStore } from "../../../stores/map/map.store";
import { GOOGLE_MAPS_API_KEY } from "../../../lib/constants";
import Marker from "./Marker";

export const MapView = () => {
  const userLocation = usePlacesStore((state) => state.userLocation);
  const selectedLocation = usePlacesStore((state) => state.selectedLocation);
  const selectedAddress = usePlacesStore((state) => state.selectedAddress);
  const zoom = useMapStore((state) => state.zoom);

  return (
    <Box width={"100%"} height={"40vh"}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
        defaultCenter={userLocation}
        defaultZoom={15}
        center={selectedLocation ? selectedLocation : { lat: 38.889805, lng: -77.009056 }}
        yesIWantToUseGoogleMapApiInternals
        zoom={zoom}
      >
        {selectedLocation && <Marker lng={selectedLocation.lng} lat={selectedLocation.lat} />}
      </GoogleMapReact>
      <Box display={"flex"} alignItems={"center"} gap={1} ml={1}>
        <Typography variant="caption" sx={{ color: "white" }}>
          Selected Address:
        </Typography>
        <Typography variant="caption" sx={{ color: "white", fontStyle: "italic" }}>
          {` ${selectedAddress}`}
        </Typography>
      </Box>
    </Box>
  );
};
