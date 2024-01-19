import { Box, Typography } from "@mui/material";
import GoogleMapReact from "google-map-react";
import React from "react";
import { GOOGLE_MAPS_API_KEY } from "../../../lib/constants";
import { useMapStore } from "../../../stores/map/map.store";
import { usePlacesStore } from "../../../stores/places/places.store";
import Marker from "./Marker";

export const MapView = () => {
  const userLocation = usePlacesStore((state) => state.userLocation);
  const selectedLocation = usePlacesStore((state) => state.selectedLocation);
  const selectedAddress = usePlacesStore((state) => state.selectedAddress);
  const zoom = useMapStore((state) => state.zoom);
  const setMap = useMapStore((state) => state.setMap);

  const handleApiLoaded = (map: google.maps.Map) => {
    setMap(map);
  };

  return (
    <Box width={"100%"} height={"40vh"}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
        defaultCenter={userLocation}
        defaultZoom={1}
        center={selectedLocation ? selectedLocation : { lat: 38.889805, lng: -77.009056 }}
        yesIWantToUseGoogleMapApiInternals
        zoom={zoom ? zoom : 1}
        onGoogleApiLoaded={({ map }) => handleApiLoaded(map)}
      >
        {selectedLocation && <Marker lng={selectedLocation.lng} lat={selectedLocation.lat} />}
      </GoogleMapReact>
      <Box display={"flex"} alignItems={"center"} gap={1} ml={1}>
        <Typography variant="caption" sx={{ color: "white" }}>
          Selected Address:
        </Typography>
        <Typography variant="caption" sx={{ color: "white", fontStyle: "italic" }}>
          {`${selectedAddress ? selectedAddress : ""}`}
        </Typography>
      </Box>
    </Box>
  );
};
