import { Box, SelectChangeEvent } from "@mui/material";
import React, { FC, useReducer } from "react";
import { NRELResponseQuery } from "../../../interfaces/NRELQuery";
import { SelectorOption } from "../../../interfaces/SelectorOptions";
import { initialState, queryFormReducer } from "../../../reducers/queryFormReducer";
import { useTypedSelector } from "../../../redux/store";
import { selectUser } from "../../../redux/userSlice";
import { getResourceItems } from "../../../utils/responseOptions";
import CustomSelector from "../ui/CustomSelector/CustomSelector";
import ParameterSelector from "./ParameterSelector";
import { useState } from "react";
import { useGetValidNRELParams } from "../../../hooks/useGetValidNRELParams";
import { selectMapState } from "../../../redux/coordinatesSlice";
interface Props {
  response: NRELResponseQuery;
}

const NRELQuerySuccess: FC<Props> = ({ response }) => {
  const [state, dispatch] = useReducer(queryFormReducer, initialState);
  const user = useTypedSelector(selectUser);
  const { coordinates } = useTypedSelector(selectMapState);
  const [urlNoParams, setUrlNoParams] = useState("");
  const { data, refetch } = useGetValidNRELParams(urlNoParams);

  const handleResourceChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    dispatch({ type: "SET_SOLAR_RESOURCE_VALUE", payload: value });
    const selectedOutput = response.outputs.find((output) => {
      return output.name === e.target.value;
    });
    dispatch({ type: "SET_SELECTED_OUTPUT", payload: selectedOutput });
    const yrs = selectedOutput.availableYears.map((year) => {
      const item: SelectorOption = { itemLabel: year, value: year };
      return item;
    });
    dispatch({ type: "SET_AVAILABLE_YEARS", payload: yrs });

    const intervalsOptions = selectedOutput.availableIntervals.map((interval) => {
      const item: SelectorOption = { itemLabel: interval, value: interval };
      return item;
    });
    dispatch({ type: "SET_INTERVALS", payload: intervalsOptions });
  };
  const handleYearChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    dispatch({ type: "SET_YEAR", payload: value });
    setUrlNoParams(
      `${state.selectedOutput.apiUrl}.csv?api_key=${user.nrelAPIKey}&email=${user.email}&wkt=POINT(${coordinates.lat} ${coordinates.lng})&names=${value}&interval=${state.interval}`
    );
    if (state.interval && value) {
      refetch();
    }
  };
  const handleIntervalChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    dispatch({ type: "SET_INTERVAL", payload: value });
    setUrlNoParams(
      `${state.selectedOutput.apiUrl}.csv?api_key=${user.nrelAPIKey}&email=${user.email}&wkt=POINT(${coordinates.lat} ${coordinates.lng})&names=${value}&interval=${state.interval}`
    );
    if (state.year && value) {
      refetch();
    }
  };

  const resourceItems = getResourceItems(response);

  const { availableYears, interval, intervals, solarResourceValue, year } = state;
  console.log(urlNoParams);
  console.log("valid params are: ", data);
  return (
    <Box display={"flex"} flexDirection={"column"} sx={{ m: 1, mr: 2 }}>
      <CustomSelector
        hasEmptyInitialValue={true}
        items={resourceItems}
        label="Resource"
        handleChange={handleResourceChange}
        value={solarResourceValue}
        fullWidth={true}
        isError={resourceItems.length < 1}
        errorMessage="Unable to load the solar resource list"
      />

      <Box width={"100%"} display={"flex"} gap={2}>
        <Box flexGrow={1}>
          <CustomSelector
            hasEmptyInitialValue={true}
            items={intervals}
            label="Intervals"
            handleChange={handleIntervalChange}
            value={interval}
            fullWidth={true}
            isError={intervals.length < 1}
            errorMessage={"unable to load Intervals"}
          />
        </Box>
        <Box flexGrow={1}>
          <CustomSelector
            hasEmptyInitialValue={true}
            items={availableYears}
            label="Years"
            handleChange={handleYearChange}
            value={year}
            fullWidth={true}
            isError={availableYears.length < 1}
            errorMessage={"Unable to load the years available"}
          />
        </Box>
      </Box>
      <Box width={"100%"}>
        <ParameterSelector fullWidth={true} />
      </Box>
      {/* <Typography variant="body1">{apiUrl}</Typography> */}
    </Box>
  );
};

export default NRELQuerySuccess;

// Bad Link
// https://developer.nrel.gov/api/nsrdb/v2/solar/psm3-2-2-download.csv?&api_key=mp56Z4nzq55AGq6GhvfGAl2gaEVPdPQR2c59dp7W&email=jcuzquia@gmail.com&names=&interval=30&attributes=not_a_valid_attribute

// good link
// https://developer.nrel.gov/api/nsrdb/v2/solar/himawari-download.csv?api_key=mp56Z4nzq55AGq6GhvfGAl2gaEVPdPQR2c59dp7W&email=camilo.uzquiano@outlook.com&names=2020&wkt=POINT(77.2295097%2028.612912)&interval=60&attributes=not_a_valid_attribute
