import { Box, Button, SelectChangeEvent } from "@mui/material";
import React, { FC, useState, useEffect } from "react";
import { useGetValidNRELParams } from "../../../hooks/useGetValidNRELParams";
import { NRELResponseQuery } from "../../../interfaces/NRELQuery";
import { SelectorOption } from "../../../interfaces/SelectorOptions";
import { selectMapState } from "../../../redux/coordinatesSlice";
import {
  selectNRELWeatherDataFormState,
  setInterval,
  setIntervals,
  setResource,
  setResourceAPI,
  setResources,
  setYear,
  setYears,
} from "../../../redux/nrelWeatherDataFormSlice";
import { useAppDispatch, useTypedSelector } from "../../../redux/store";
import { selectUser } from "../../../redux/userSlice";
import { getResourceItems } from "../../../utils/responseOptions";
import CustomSelector from "../ui/CustomSelector/CustomSelector";
import ParameterSelector from "./ParameterSelector";
interface Props {
  response: NRELResponseQuery;
}

const NRELQuerySuccess: FC<Props> = ({ response }) => {
  const user = useTypedSelector(selectUser);
  const dispatch = useAppDispatch();
  const { interval, intervals, resource, resources, year, selectedAttributes, years, resourceAPI } =
    useTypedSelector(selectNRELWeatherDataFormState);
  const { coordinates } = useTypedSelector(selectMapState);
  const [urlNoParams, setUrlNoParams] = useState("");
  const { data, refetch } = useGetValidNRELParams(urlNoParams);

  const handleResourceChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    dispatch(setResource(value));
    const selectedOutput = response.outputs.find((output) => {
      return output.name === e.target.value;
    });
    dispatch(setResourceAPI(selectedOutput.apiUrl));
    const yrs = selectedOutput.availableYears.map((year) => {
      const item: SelectorOption = { itemLabel: year, value: year };
      return item;
    });
    dispatch(setYears(yrs));

    const intervalsOptions = selectedOutput.availableIntervals.map((interval) => {
      const item: SelectorOption = { itemLabel: interval, value: interval };
      return item;
    });
    dispatch(setIntervals(intervalsOptions));
    setUrlNoParams(
      `${resourceAPI}.csv?api_key=${user.nrelAPIKey}&email=${user.email}&wkt=POINT(${coordinates.lng} ${coordinates.lat})&names=${year}&interval=${interval}`
    );
  };
  const handleYearChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    dispatch(setYear(value));
    setUrlNoParams(
      `${resourceAPI}.csv?api_key=${user.nrelAPIKey}&email=${user.email}&wkt=POINT(${coordinates.lng} ${coordinates.lat})&names=${value}&interval=${interval}`
    );
    if (interval && value) {
      refetch();
    }
  };
  const handleIntervalChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    dispatch(setInterval(value));
    setUrlNoParams(
      `${resourceAPI}.csv?api_key=${user.nrelAPIKey}&email=${user.email}&wkt=POINT(${coordinates.lng} ${coordinates.lat})&names=${year}&interval=${value}`
    );
    if (year && value) {
      refetch();
    }
  };
  useEffect(() => {
    const resourceItems = getResourceItems(response);
    dispatch(setResources(resourceItems));
  }, []);

  const handleDownloadData = () => {
    console.log(
      "This is the full urls: ",
      `${resourceAPI}.csv?api_key=${user.nrelAPIKey}&email=${user.email}&wkt=POINT(${coordinates.lng} ${
        coordinates.lat
      })&names=${year}&interval=${interval}&attributes=${selectedAttributes.join(",")}`
    );
  };

  console.log("This is the url to get no params: ", urlNoParams);

  return (
    <Box display={"flex"} flexDirection={"column"} sx={{ m: 1, mr: 2 }}>
      <CustomSelector
        hasEmptyInitialValue={true}
        items={resources}
        label="Resource"
        handleChange={handleResourceChange}
        value={resource}
        fullWidth={true}
        isError={resources.length < 1}
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
            items={years}
            label="Years"
            handleChange={handleYearChange}
            value={year}
            fullWidth={true}
            isError={years.length < 1}
            errorMessage={"Unable to load the years available"}
          />
        </Box>
      </Box>
      {data && (
        <Box width={"100%"}>
          <ParameterSelector fullWidth={true} attributes={data} />
        </Box>
      )}
      <Button variant="contained" size="small" fullWidth color="primary" onClick={handleDownloadData}>
        Download Data
      </Button>
    </Box>
  );
};

export default NRELQuerySuccess;
