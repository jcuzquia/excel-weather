import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import { selectNRELQueryState } from "../../../redux/nrelQuerySlice";
import { useTypedSelector } from "../../../redux/store";
import NRELWeatherQueryForm from "../../components/NRELQuery/NRELWeatherQueryForm";

const NRELWeatherPage: React.FC = () => {
  const response = useTypedSelector(selectNRELQueryState);
  let isValidResponse: boolean;
  isValidResponse = response && response.errors.length < 1;
  return (
    <Box width={"100%"} display={"flex"} alignItems={"center"} flexDirection={"column"}>
      <Box width={"100%"} display={"flex"} flexDirection={"column"} m={1}>
        <Box m={1}>
          <Typography variant="h5">Start with a location:</Typography>
        </Box>
      </Box>
      <Box width={"100%"}>{isValidResponse ? <NRELWeatherQueryForm /> : null}</Box>
    </Box>
  );
};

export default NRELWeatherPage;
