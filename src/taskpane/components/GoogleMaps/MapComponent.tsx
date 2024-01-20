import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useMapStore } from "../../../stores/map/map.store";
import { usePlacesStore } from "../../../stores/places/places.store";

interface Props {
  center: google.maps.LatLngLiteral;
  zoom: number;
}

export const MapComponent = ({ center, zoom }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const setMap = useMapStore((state) => state.setMap);
  const map = useMapStore((state) => state.map);
  const selectedLocation = usePlacesStore((state) => state.selectedLocation);
  const selectedAddress = usePlacesStore((state) => state.selectedAddress);
  const setMarker = useMapStore((state) => state.setMarker);
  useEffect(() => {
    const map = new window.google.maps.Map(ref.current!, {
      center: center,
      zoom,
    });
    setMap(map);
  }, [center, zoom]);

  useEffect(() => {
    if (selectedAddress) {
      const newMarker = new google.maps.Marker({ position: selectedLocation, map });
      setMarker(newMarker);
    }
  }, [map, setMarker, selectedAddress]);

  return <Box component={"div"} ref={ref} id="map" width={"100%"} height={"100%"} />;
};
