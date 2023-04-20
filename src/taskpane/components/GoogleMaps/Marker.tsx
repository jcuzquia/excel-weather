import React, { FC } from "react";

interface Props {
  lat: number;
  lng: number;
}

const Marker: FC<Props> = ({ lat, lng }) => {
  console.log(lat, lng);
  return <div>Marker</div>;
};

export default Marker;
