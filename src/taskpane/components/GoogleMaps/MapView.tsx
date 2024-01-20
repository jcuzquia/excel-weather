import { Wrapper } from "@googlemaps/react-wrapper";
import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { GOOGLE_MAPS_API_KEY } from "../../../lib/constants";
import { usePlacesStore } from "../../../stores/places/places.store";
import { MapComponent } from "./MapComponent";
import { useMapStore } from "../../../stores/map/map.store";

export const MapView = () => {
  const selectedLocation = usePlacesStore((state) => state.selectedLocation);
  const selectedAddress = usePlacesStore((state) => state.selectedAddress);
  const zoom = useMapStore((state) => state.zoom);
  // const location = new google.maps.LatLng(userLocation);
  // console.log(zoom, location);

  return (
    <Box width={"100%"} height={"40vh"}>
      <Box width={"100%"} height={"100%"}>
        <Wrapper apiKey={GOOGLE_MAPS_API_KEY} libraries={["visualization"]}>
          <MapComponent center={selectedLocation} zoom={zoom} />
        </Wrapper>
      </Box>
      {/* <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
        defaultCenter={userLocation}
        defaultZoom={1}
        center={selectedLocation ? selectedLocation : { lat: 38.889805, lng: -77.009056 }}
        yesIWantToUseGoogleMapApiInternals
        zoom={zoom ? zoom : 1}
        onGoogleApiLoaded={({ map }) => handleApiLoaded(map)}
      >
        {selectedLocation && <Marker lng={selectedLocation.lng} lat={selectedLocation.lat} />}
      </GoogleMapReact> */}
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
