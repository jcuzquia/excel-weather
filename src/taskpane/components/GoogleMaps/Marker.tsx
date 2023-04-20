import React, { FC } from "react";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
interface Props {
  lat: number;
  lng: number;
}

const Marker: FC<Props> = ({ lat, lng }) => {
  console.log(lat, lng);
  return <LocationSearchingIcon color="success" />;
};

export default Marker;
