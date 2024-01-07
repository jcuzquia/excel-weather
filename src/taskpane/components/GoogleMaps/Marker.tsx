import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { Box } from "@mui/material";
import React, { FC } from "react";
interface Props {
  lat: number;
  lng: number;
}

const Marker: FC<Props> = () => {
  return <LocationSearchingIcon color="error" />;
};

export default Marker;
