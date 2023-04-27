import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { FC } from "react";

interface Props {
  intervalValue: string | number;
  intervals: Array<string | number> | null;
  setInterval: (value: string) => void;
}

const IntervalSelector: FC<Props> = ({ intervalValue, intervals, setInterval }) => {
  const handleChange = (event: SelectChangeEvent) => {
    setInterval(event.target.value);
  };
  return (
    <FormControl fullWidth size="small">
      <InputLabel id="interval-selector">Intervals</InputLabel>
      <Select labelId="interval-selector" id="interval" value={intervalValue} label="Interval" onChange={handleChange}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>

        {intervals &&
          intervals.map((year) => (
            <MenuItem value={year} key={year}>
              {year}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default IntervalSelector;
