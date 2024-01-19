import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import React, { FC } from "react";

interface Props {
  lat: number;
  lng: number;
}

const Marker: FC<Props> = () => {
  return <LocationSearchingIcon color="error" style={{ transform: "translate(-50%, -50%)" }} />;
};

export default Marker;
