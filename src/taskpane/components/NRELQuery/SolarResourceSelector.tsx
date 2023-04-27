import { FormControl, InputLabel, Select, SelectChangeEvent } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import React, { FC } from "react";
import { NRELQueryOutput } from "../../../interfaces/NRELQuery";

interface Props {
  solarResources: NRELQueryOutput[];
  solarResourceValue: string;
  setSolarResourceValue: (value: string) => void;
}

const SolarResourceSelector: FC<Props> = ({ solarResources, solarResourceValue, setSolarResourceValue }) => {
  const handleChange = (event: SelectChangeEvent) => {
    setSolarResourceValue(event.target.value);
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel id="solar-resource-selector">Resource</InputLabel>
      <Select
        labelId="solar-resource-selector"
        id="solar-resource"
        value={solarResourceValue}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {solarResources.map((res) => (
          <MenuItem value={res.name} key={res.name}>
            {res.displayName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SolarResourceSelector;
