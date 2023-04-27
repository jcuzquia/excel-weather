import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import GoogleMapsTextField from "../components/GoogleMaps/GoogleMapsTextField";
import Map from "../components/GoogleMaps/Map";

const NRELWeatherPage: React.FC = () => {
  return (
    <Box width={"100%"} display={"flex"} alignItems={"center"} flexDirection={"column"}>
      <Box width={"100%"} display={"flex"} flexDirection={"column"} m={2}>
        <Box m={2}>
          <Typography variant="h5">Start with a location:</Typography>

          <GoogleMapsTextField />
        </Box>
      </Box>
      <Map />
    </Box>
  );
};

export default NRELWeatherPage;
