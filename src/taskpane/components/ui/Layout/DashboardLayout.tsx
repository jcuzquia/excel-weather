import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { MapView } from "..";
import { usePlacesStore } from "../../../../stores/places/places.store";
import { GoogleMapsAutoCompleteForm } from "../..";
import { useUserStore } from "../../../../stores/user/user.store";
import Link from "../Link/Link";

interface Props {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: Props) => {
  const setUserLocation = usePlacesStore((state) => state.setUserLocation);
  const setIsLoading = usePlacesStore((state) => state.setIsLoading);
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    setIsLoading(true);
    setUserLocation()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [setIsLoading, setUserLocation]);

  return (
    <Box>
      {!user.validNRELAPIKey && (
        <Box pl={1} pr={1}>
          <Link href="/profile">
            <Typography variant="caption" color={"error"}>
              No API Key Found for user click here to insert one
            </Typography>
          </Link>
        </Box>
      )}
      <GoogleMapsAutoCompleteForm />
      <MapView />

      {children}
    </Box>
  );
};
