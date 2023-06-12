import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import React, { ChangeEvent, FC, useState } from "react";
import { QueryAttribute } from "../../../interfaces/NRELQuery";
import { useAppDispatch } from "../../../redux/store";
import { setSelectedAttributes } from "../../../redux/nrelWeatherDataFormSlice";

interface Props {
  fullWidth?: boolean;
  attributes: QueryAttribute[];
}

const ParameterSelector: FC<Props> = ({ fullWidth, attributes }) => {
  const [attributeList, setAttributeList] = useState(attributes);
  const [attributeStr, setAttributeStr] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const handleAttributeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    dispatch(setSelectedAttributes(typeof value === "string" ? value.split(",") : value));
    setAttributeStr(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeAll = () => {
    const allSelected = attributeList.every((attribute) => attribute.selected);
    const updatedAttributeList = attributeList.map((attribute) => ({
      ...attribute,
      selected: !allSelected,
    }));
    setAttributeList(updatedAttributeList);
    setAttributeStr(
      updatedAttributeList.filter((attribute) => attribute.selected).map((attribute) => attribute.attribute)
    );
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth={fullWidth} size="small" margin="dense">
      <InputLabel id="demo-multiple-checkbox-label">Parameters</InputLabel>
      <Select
        size="small"
        labelId="demo-multiple-checkbox-label"
        multiple
        value={attributeStr}
        onChange={handleAttributeChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        <MenuItem value={"select-all"}>
          <Checkbox size="small" onChange={handleChangeAll} />
          <ListItemText primary={"Select All"} />
        </MenuItem>
        {attributeList.map((attribute) => (
          <MenuItem key={attribute.attribute} value={attribute.attribute}>
            <Checkbox
              size="small"
              checked={attributeStr.indexOf(attribute.attribute) > -1}
              value={attribute.attribute}
            />
            <ListItemText primary={attribute.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ParameterSelector;
