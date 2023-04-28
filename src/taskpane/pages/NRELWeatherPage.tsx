import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import GoogleMapsTextField from "../components/GoogleMaps/GoogleMapsTextField";
import Map from "../components/GoogleMaps/Map";
import NRELWeatherQueryForm from "../components/NRELQuery/NRELWeatherQueryForm";

const NRELWeatherPage: React.FC = () => {
  return (
    <Box width={"100%"} display={"flex"} alignItems={"center"} flexDirection={"column"}>
      <Box width={"100%"} display={"flex"} flexDirection={"column"} m={1}>
        <Box m={1}>
          <Typography variant="h5">Start with a location:</Typography>

          <GoogleMapsTextField />
        </Box>
      </Box>
      <Map />
      <Box width={"100%"}>
        <NRELWeatherQueryForm />
      </Box>
    </Box>
  );
};

export default NRELWeatherPage;
