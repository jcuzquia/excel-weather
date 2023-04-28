import React, { FC, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
  Box,
  OutlinedInput,
  Checkbox,
  Chip,
  SelectChangeEvent,
} from "@mui/material";

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

interface Props {
  fullWidth?: boolean;
}

const ParameterSelector: FC<Props> = ({ fullWidth }) => {
  const [personName, setPersonName] = useState<string[]>([]);
  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <FormControl sx={{ m: 1 }} margin="dense" fullWidth={fullWidth}>
      <InputLabel id="demo-multiple-checkbox-label">Parameters</InputLabel>
      <Select
        size="small"
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={personName}
        onChange={handleChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {names.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={personName.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ParameterSelector;
