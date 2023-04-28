import { Box } from "@mui/material";
import React from "react";
import { useTypedSelector } from "../../../redux/store";

import { selectNRELQueryState } from "../../../redux/nrelQuerySlice";
import NRELQuerySuccess from "./NRELQuerySuccess";

const NRELWeatherQueryForm = () => {
  const nrelQuery = useTypedSelector(selectNRELQueryState);

  return <Box>{nrelQuery && <NRELQuerySuccess response={nrelQuery} />}</Box>;
};

export default NRELWeatherQueryForm;
