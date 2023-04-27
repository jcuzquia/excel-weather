import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { FC } from "react";

interface Props {
  yearsValue: string | number;
  years: Array<string | number> | null;
  setYear: (value: string) => void;
}

const YearsAvailableSelector: FC<Props> = ({ yearsValue, years, setYear }) => {
  const handleChange = (event: SelectChangeEvent) => {
    setYear(event.target.value);
  };
  return (
    <FormControl fullWidth size="small">
      <InputLabel id="solar-resource-selector">Years</InputLabel>
      <Select
        labelId="solar-resource-selector"
        id="solar-resource"
        value={yearsValue}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>

        {years &&
          years.map((year) => (
            <MenuItem value={year} key={year}>
              {year}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default YearsAvailableSelector;
