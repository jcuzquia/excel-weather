import { Box } from "@mui/material";
import React from "react";
import NRELWeatherQueryForm from "./NRELWeatherQueryForm";
import { useNRELApiStore } from "../../../stores/nrel-api/nrel-api.store";

const NRELWeatherPage: React.FC = () => {
  const nrelResponseQuery = useNRELApiStore((state) => state.nrelResponseQuery);
  return <Box>{nrelResponseQuery && <NRELWeatherQueryForm />}</Box>;
};

export default NRELWeatherPage;
