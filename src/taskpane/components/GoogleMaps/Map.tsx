import { Box } from "@mui/material";
import GoogleMapReact from "google-map-react";
import React from "react";
import { usePlacesStore } from "../../../stores/places/places.store";
import { useMapStore } from "../../../stores/map/map.store";

export const MapView = () => {
  const userLocation = usePlacesStore((state) => state.userLocation);
  const isLoading = usePlacesStore((state) => state.isLoading);
  const setMap = useMapStore((state) => state.setMap);
  return (
    <Box width={"100%"} height={"30vh"}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBveugtwt78z1xoVcn2sZtT89b7IDpBJww" }}
        defaultCenter={{ lat: 45, lng: 45 }}
        defaultZoom={15}
        center={userLocation}
        yesIWantToUseGoogleMapApiInternals
        zoom={11}
      ></GoogleMapReact>
    </Box>
  );
};
