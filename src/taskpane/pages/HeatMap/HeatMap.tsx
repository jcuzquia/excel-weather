import { Wrapper } from "@googlemaps/react-wrapper";
import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { GOOGLE_MAPS_API_KEY } from "../../../lib/constants";
import { useMapStore } from "../../../stores/map/map.store";
import { MapComponent } from "../../components";
import { getHeatMapTable } from "../../../commands/heatmap.commands";

var heatMapData = [
  { location: new google.maps.LatLng(37.782, -122.447), weight: 0.5 },
  new google.maps.LatLng(37.782, -122.445),
  { location: new google.maps.LatLng(37.782, -122.443), weight: 2 },
  { location: new google.maps.LatLng(37.782, -122.441), weight: 3 },
  { location: new google.maps.LatLng(37.782, -122.439), weight: 2 },
  new google.maps.LatLng(37.782, -122.437),
  { location: new google.maps.LatLng(37.782, -122.435), weight: 0.5 },

  { location: new google.maps.LatLng(37.785, -122.447), weight: 3 },
  { location: new google.maps.LatLng(37.785, -122.445), weight: 2 },
  new google.maps.LatLng(37.785, -122.443),
  { location: new google.maps.LatLng(37.785, -122.441), weight: 0.5 },
  new google.maps.LatLng(37.785, -122.439),
  { location: new google.maps.LatLng(37.785, -122.437), weight: 2 },
  { location: new google.maps.LatLng(37.785, -122.435), weight: 30 },
];

const sanFrancisco = { lat: 37.774546, lng: -122.433523 };

const HeatMap = () => {
  const map = useMapStore((state) => state.map);

  useEffect(() => {
    if (map) {
      console.log("Starting USEEFFECT");
      const heatMap = new google.maps.visualization.HeatmapLayer({ data: heatMapData, map: map });
      console.log("Starting USEEFFECT2");
      heatMap.set("radius", 20);
      heatMap.set("opacity", 0.6);
    }
  }, [map]);

  return (
    <Box width={"100%"} display={"flex"} flexDirection={"column"}>
      <Box width={"100%"} height={"40vh"}>
        <Wrapper apiKey={GOOGLE_MAPS_API_KEY} libraries={["visualization"]}>
          <MapComponent center={sanFrancisco} zoom={13} />
        </Wrapper>
      </Box>
      <Button onClick={() => getHeatMapTable()}>Click</Button>
    </Box>
  );
};

export default HeatMap;
