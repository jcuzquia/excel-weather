import { Box, Checkbox, FormControlLabel, Paper, Typography } from "@mui/material";
import React from "react";
import { SelectorOption } from "../../../interfaces/SelectorOptions";
import { useNRELApiStore } from "../../../stores/nrel-api/nrel-api.store";

interface Props {
  paramsOptions: SelectorOption[];
}

const ValidParamsCard = ({ paramsOptions }: Props) => {
  const [checkedValues, setCheckedValues] = React.useState<Array<string | number>>([]);
  const setSelectedParameters = useNRELApiStore((state) => state.setSelectedParameters);

  const handleSelectAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckedValues(paramsOptions.map((o) => o.value));
      setSelectedParameters(paramsOptions.map((o) => o.value));
    } else {
      setCheckedValues([]);
      setSelectedParameters([]);
    }
    setCheckedValues(event.target.checked ? paramsOptions.map((o) => o.value) : []);
  };

  const handleCheckedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as string;
    const isChecked = event.target.checked;

    setCheckedValues((prevValues) => {
      const validParams = isChecked ? [...prevValues, value] : prevValues.filter((v) => v !== value);
      setSelectedParameters(validParams);
      return validParams;
    });
  };

  console.log("this are the parameters", useNRELApiStore.getState().selectedParameters);
  return (
    <Paper>
      <Box display={"flex"} flexDirection={"column"} mt={1} ml={1}>
        <Typography variant="subtitle1" fontWeight={700} color={"white"}>
          Select Parameters
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              sx={{ "& .MuiSvgIcon-root": { fontSize: 15 } }}
              checked={checkedValues.length === paramsOptions.length}
              indeterminate={checkedValues.length > 0 && checkedValues.length < paramsOptions.length}
              onChange={handleSelectAllChange}
            />
          }
          label="Select All"
          sx={{ color: "white" }}
        />
        {paramsOptions.map((option) => (
          <FormControlLabel
            key={option.value}
            sx={{ color: "white" }}
            control={
              <Checkbox
                size="small"
                sx={{ "& .MuiSvgIcon-root": { fontSize: 15 } }}
                checked={checkedValues.includes(option.value)}
                onChange={handleCheckedChange}
              />
            }
            label={option.itemLabel}
            value={option.value}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default ValidParamsCard;
