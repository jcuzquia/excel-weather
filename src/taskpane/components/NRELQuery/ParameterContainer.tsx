import React from "react";
import { QueryAttribute } from "../../../interfaces/NRELQuery";
import { Box, Typography, Checkbox, FormControlLabel, FormControl, FormLabel, FormGroup } from "@mui/material";

interface Props {
  parameters: Array<QueryAttribute>;
}

const ParameterContainer: React.FC<Props> = ({ parameters }) => {
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Box pl={1}>
        <FormControl>
          <FormLabel component={"legend"}>Parameters</FormLabel>
          <FormGroup>
            {parameters.map((param, id) => (
              <FormControlLabel key={id} control={<Checkbox size="small" />} label={param.name} />
            ))}
          </FormGroup>
        </FormControl>
      </Box>
    </Box>
  );
};

export default ParameterContainer;
