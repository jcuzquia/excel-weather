import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { FC } from "react";
import { SelectorOption } from "../../../../interfaces/SelectorOptions";

interface Props {
  fullWidth?: boolean;
  value: string | number;
  items: Array<SelectorOption>;
  label: string;
  isError?: boolean;
  errorMessage?: string;
  hasEmptyInitialValue: boolean;
  setValue: (value: string | number) => void;
}

const CustomSelector: FC<Props> = ({
  fullWidth,
  items,
  setValue,
  isError,
  label,
  value,
  hasEmptyInitialValue,
  errorMessage,
}) => {
  const handleChange = (e: SelectChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} error={isError} fullWidth={fullWidth} size="small" margin="dense">
      <InputLabel id="select-label">{label}</InputLabel>
      <Select labelId="select-label" id="select" value={value} label={label} onChange={handleChange}>
        {hasEmptyInitialValue && (
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
        )}

        {items.map((item, i) => (
          <MenuItem value={item.value} key={i}>
            {item.itemLabel}
          </MenuItem>
        ))}
      </Select>
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};

export default CustomSelector;
