import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { MapView } from "..";
import { usePlacesStore } from "../../../../stores/places/places.store";
import { GoogleMapsAutoCompleteForm } from "../..";

interface Props {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: Props) => {
  const setUserLocation = usePlacesStore((state) => state.setUserLocation);
  const setIsLoading = usePlacesStore((state) => state.setIsLoading);
  useEffect(() => {
    setIsLoading(true);
    setUserLocation()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [setIsLoading, setUserLocation]);

  return (
    <Box>
      <GoogleMapsAutoCompleteForm />
      <MapView />

      {children}
    </Box>
  );
};
