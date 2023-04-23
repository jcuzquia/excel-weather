import { Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio, FormLabel } from "@mui/material";
import React, { FC } from "react";
import { useState, ChangeEvent } from "react";
interface Props {
  intervals: Array<Number>;
}

const IntervalContainer: FC<Props> = ({ intervals }) => {
  const [value, setValue] = useState("");

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <Box display={"flex"} width={"100%"} flexDirection={"column"} alignItems={"flex-start"}>
      <Box pl={2}>
        <FormControl>
          <FormLabel>Interval</FormLabel>
          <RadioGroup aria-labelledby="interval-label" name="interval-buttons-group" onChange={handleRadioChange}>
            {intervals.map((interval, id) => (
              <FormControlLabel
                labelPlacement="end"
                value={interval}
                control={<Radio size="small" sx={{ p: 0.5 }} />}
                label={interval}
                key={id}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
      <Typography>{value}</Typography>
    </Box>
  );
};

export default IntervalContainer;
