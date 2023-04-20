import { Box } from "@mui/material";
import GoogleMapReact from "google-map-react";
import React from "react";
import { selectCoordinates } from "../../../redux/coordinatesSlice";
import { useTypedSelector } from "../../../redux/store";
import Marker from "./Marker";
import { useEffect, useState } from "react";
import { ICoordinates } from "../../../interfaces/coordinates";
const defaultProps = {
  center: {
    lat: 10.99835602,
    lng: 77.01502627,
  },
  zoom: 11,
};

const Map = () => {
  const { coordinates } = useTypedSelector(selectCoordinates);
  const [coordinatesState, setCoordinatesState] = useState<ICoordinates | null>(null);
  useEffect(() => {
    setCoordinatesState(coordinates);
  }, [coordinates]);

  return (
    <Box width={"100%"} height={"50vh"} sx={{ backgroundColor: "blue" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBveugtwt78z1xoVcn2sZtT89b7IDpBJww" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        center={coordinatesState ? coordinatesState : defaultProps.center}
        yesIWantToUseGoogleMapApiInternals
        zoom={15}
      >
        <Marker lat={coordinates.lat} lng={coordinates.lng} />
      </GoogleMapReact>
    </Box>
  );
};

export default Map;
