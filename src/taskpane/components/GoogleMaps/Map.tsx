import { Box } from "@mui/material";
import GoogleMapReact from "google-map-react";
import React from "react";
import { initialMapState, selectMapState } from "../../../redux/coordinatesSlice";
import { useTypedSelector } from "../../../redux/store";
import Marker from "./Marker";
import { useEffect, useState } from "react";
import { ICoordinates } from "../../../interfaces/coordinates";

const Map = () => {
  const { coordinates, zoom } = useTypedSelector(selectMapState);
  const [coordinatesState, setCoordinatesState] = useState<ICoordinates | null>(null);
  useEffect(() => {
    setCoordinatesState(coordinates);
  }, [coordinates]);

  return (
    <Box width={"100%"} height={"30vh"}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBveugtwt78z1xoVcn2sZtT89b7IDpBJww" }}
        defaultCenter={coordinates}
        defaultZoom={15}
        center={coordinatesState}
        yesIWantToUseGoogleMapApiInternals
        zoom={zoom}
      >
        <Marker
          lat={coordinates ? coordinates.lat : initialMapState.coordinates.lat}
          lng={coordinates ? coordinates.lng : initialMapState.coordinates.lng}
        />
      </GoogleMapReact>
    </Box>
  );
};

export default Map;
