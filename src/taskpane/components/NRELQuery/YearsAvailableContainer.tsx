import React from "react";
import { Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useState } from "react";
import { ChangeEvent } from "react";

interface Props {
  yearsAvailable: Array<string | number>;
}

const YearsAvailableContainer: React.FC<Props> = ({ yearsAvailable }) => {
  const [value, setValue] = useState("");
  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Typography variant="body1">Years Available</Typography>
      <FormControl>
        <RadioGroup aria-labelledby="interval-label" name="interval-buttons-group" onChange={handleRadioChange}>
          {yearsAvailable.map((years, id) => (
            <FormControlLabel
              labelPlacement="end"
              value={years}
              control={<Radio size="small" sx={{ p: 0.5 }} />}
              label={years}
              key={id}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Typography>{value}</Typography>
    </Box>
  );
};

export default YearsAvailableContainer;
