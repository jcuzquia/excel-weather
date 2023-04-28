import { Box, Grid, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { NRELResponseQuery, fullDiscAttributes } from "../../../interfaces/NRELQuery";
import { SelectorOption } from "../../../interfaces/SelectorOptions";
import CustomSelector from "../ui/CustomSelector/CustomSelector";
import ParameterSelector from "./ParameterSelector";
import { useTypedSelector } from "../../../redux/store";
import { selectMapState } from "../../../redux/coordinatesSlice";
import { selectUser } from "../../../redux/userSlice";
interface Props {
  response: NRELResponseQuery;
}

const NRELQuerySuccess: FC<Props> = ({ response }) => {
  const [solarResourceValue, setSolarResourceValue] = useState<string | number>("");
  const [year, setYear] = useState<string | number>("");
  const [interval, setInterval] = useState<string | number>("");
  const [parameter, setParameter] = useState<string | number>("");
  const { coordinates } = useTypedSelector(selectMapState);
  const user = useTypedSelector(selectUser);
  let availableYears: Array<SelectorOption> | [];
  let intervals: Array<SelectorOption> | [];
  let resourceItems: Array<SelectorOption> | [];
  let availableParameters: Array<SelectorOption> | [];
  let apiUrl: string;
  resourceItems = response.outputs.map((output) => {
    const item: SelectorOption = { itemLabel: output.displayName, value: output.name };
    return item;
  });

  if (response.outputs && solarResourceValue) {
    const foundOuput = response.outputs.find((output) => output.name === solarResourceValue);

    if (foundOuput) {
      availableYears = foundOuput.availableYears.map((year) => {
        const item: SelectorOption = { itemLabel: year, value: year };
        return item;
      });
      apiUrl = foundOuput.apiUrl;
      intervals = foundOuput.availableIntervals.map((interval) => {
        const item: SelectorOption = { itemLabel: interval, value: interval };
        return item;
      });
      availableParameters = fullDiscAttributes.map((param) => {
        const item: SelectorOption = { itemLabel: param.name, value: param.parameter };
        return item;
      });
    }
  } else {
    availableYears = [];
    intervals = [];
    availableParameters = [];
  }
  const selectorErrorMessage = availableYears.length < 1 || intervals.length < 1 ? "Select a resource" : null;

  return (
    <Box display={"flex"} flexDirection={"column"} sx={{ m: 2 }}>
      <CustomSelector
        hasEmptyInitialValue={true}
        items={resourceItems}
        label="Resource"
        setValue={setSolarResourceValue}
        value={solarResourceValue}
        fullWidth={true}
        isError={resourceItems.length < 1}
      />

      <Box width={"100%"} display={"flex"}>
        <Box flexGrow={1}>
          <CustomSelector
            hasEmptyInitialValue={true}
            items={intervals}
            label="Intervals"
            setValue={setInterval}
            value={interval}
            fullWidth={true}
            isError={intervals.length < 1}
            errorMessage={selectorErrorMessage}
          />
        </Box>
        <Box flexGrow={1}>
          <CustomSelector
            hasEmptyInitialValue={true}
            items={availableYears}
            label="Years"
            setValue={setYear}
            value={year}
            fullWidth={true}
            isError={availableYears.length < 1}
            errorMessage={selectorErrorMessage}
          />
        </Box>
      </Box>
      <Box width={"100%"}>
        <ParameterSelector fullWidth={true} />
      </Box>
      <Typography variant="body1">{`${apiUrl}.csv?api_key=${user.nrelAPIKey}&email=${user.nrelEmail}&names=${year}&wkt=POINT(${coordinates.lng} ${coordinates.lat})&interval=${interval}`}</Typography>
    </Box>
  );
};

export default NRELQuerySuccess;
