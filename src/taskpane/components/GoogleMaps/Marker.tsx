import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import React, { FC } from "react";
interface Props {
  lat: number;
  lng: number;
}

const Marker: FC<Props> = ({ lat, lng }) => {
  console.log(lat, lng);
  return <LocationSearchingIcon color="error" />;
};

export default Marker;
