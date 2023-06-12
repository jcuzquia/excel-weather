import { Box, Button, SelectChangeEvent } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { httpsCallable } from "firebase/functions";
import React, { FC, useEffect, useState } from "react";
import { writeWeatherDataToOfficeDocument } from "../../../commands/commands";
import { functions } from "../../../firebase/config";
import { useGetValidNRELParams } from "../../../hooks/useGetValidNRELParams";
import { NRELResponseQuery } from "../../../interfaces/NRELQuery";
import { SelectorOption } from "../../../interfaces/SelectorOptions";
import { selectUser } from "../../../redux/authSlice";
import { selectMapState } from "../../../redux/coordinatesSlice";
import {
  selectNRELWeatherDataFormState,
  setCSVUrl,
  setInterval,
  setIntervals,
  setResource,
  setResourceAPI,
  setResources,
  setYear,
  setYears,
} from "../../../redux/nrelWeatherDataFormSlice";
import { useAppDispatch, useTypedSelector } from "../../../redux/store";
import { getResourceItems } from "../../../utils/responseOptions";
import CustomSelector from "../ui/CustomSelector/CustomSelector";
import ParameterSelector from "./ParameterSelector";
interface Props {
  response: NRELResponseQuery;
}

const NRELQuerySuccess: FC<Props> = ({ response }) => {
  const [loading, setLoading] = useState(false);
  const user = useTypedSelector(selectUser);
  const dispatch = useAppDispatch();
  const { interval, intervals, resource, resources, year, selectedAttributes, years, resourceAPI } =
    useTypedSelector(selectNRELWeatherDataFormState);
  const { coordinates } = useTypedSelector(selectMapState);
  const [urlNoParams, setUrlNoParams] = useState("");
  const { data, refetch } = useGetValidNRELParams(urlNoParams);
  const {
    data: csvData,
    isError,
    fetchStatus,
    isLoading,
    error,
    status,
    refetch: refetchCSV,
  } = useQuery({
    queryKey: ["queryCSV"],

    queryFn: async () => {
      const fetchNRELWeatherData = httpsCallable(functions, "fetchNRELWeatherData");
      const url = `${resourceAPI}.csv?api_key=${user.nrelAPIKey}&email=${user.email}&wkt=POINT(${coordinates.lng} ${
        coordinates.lat
      })&names=${year}&interval=${interval}&attributes=${selectedAttributes.join(",")}`;
      // Create a request object with the necessary headers and body

      const res = await fetchNRELWeatherData(url);
      if (res.data) {
        await writeWeatherDataToOfficeDocument(res.data as string);
      }
    },
    enabled: false,
  });

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
    dispatch(setYear(""));

    const intervalsOptions = selectedOutput.availableIntervals.map((interval) => {
      const item: SelectorOption = { itemLabel: interval, value: interval };
      return item;
    });
    dispatch(setIntervals(intervalsOptions));
    dispatch(setInterval(""));
    setUrlNoParams(
      `${resourceAPI}.csv?api_key=${user.nrelAPIKey}&email=${user.email}&wkt=POINT(${coordinates.lng} ${coordinates.lat})&names=${year}&interval=${interval}}`
    );
  };
  const handleYearChange = async (e: SelectChangeEvent) => {
    const value = e.target.value;
    dispatch(setYear(value));
    console.log("Year Change", interval, value);
    setUrlNoParams(
      `${resourceAPI}.csv?api_key=${user.nrelAPIKey}&email=${user.email}&wkt=POINT(${coordinates.lng} ${coordinates.lat})&names=${year}&interval=${interval}}`
    );

    if (interval && value) {
      await refetch();
    }
  };
  const handleIntervalChange = async (e: SelectChangeEvent) => {
    const value = e.target.value;
    console.log("Interval Change", year, value);
    dispatch(setInterval(value));

    setUrlNoParams(
      `${resourceAPI}.csv?api_key=${user.nrelAPIKey}&email=${user.email}&wkt=POINT(${coordinates.lng} ${coordinates.lat})&names=${year}&interval=${interval}}`
    );
    if (year && value) {
      await refetch();
    }
  };

  const handleDownloadData = () => {
    refetchCSV();
  };

  useEffect(() => {
    const resourceItems = getResourceItems(response);
    dispatch(setResources(resourceItems));
    dispatch(
      setCSVUrl(
        `${resourceAPI}.csv?api_key=${user.nrelAPIKey}&email=${user.email}&wkt=POINT(${coordinates.lng} ${
          coordinates.lat
        })&names=${year}&interval=${interval}&attributes=${selectedAttributes.join(",")}`
      )
    );
  }, []);

  const isResourcesError = !resources || resources.length === 0;
  const resourcesErrorMessage = isResourcesError ? "Unable to load the solar resource list" : "";
  const isIntervalError = !intervals || intervals.length === 0;
  const intervalsErrorMessage = isIntervalError ? "No Intervals loaded yet" : "";

  const isYearsError = !years || years.length === 0;
  const yearsErrorMessage = isYearsError ? "No Years loaded yet" : "";

  return (
    <Box display={"flex"} flexDirection={"column"} sx={{ m: 1, mr: 2 }}>
      <CustomSelector
        hasEmptyInitialValue={true}
        items={resources}
        label="Resource"
        handleChange={handleResourceChange}
        value={resource}
        fullWidth={true}
        isError={isResourcesError}
        errorMessage={resourcesErrorMessage}
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
            isError={isIntervalError}
            errorMessage={intervalsErrorMessage}
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
            isError={isYearsError}
            errorMessage={yearsErrorMessage}
          />
        </Box>
      </Box>
      <Box flexGrow={1} display={"flex"}>
        {data && <ParameterSelector fullWidth attributes={data} />}
      </Box>
      <Button variant="contained" size="small" fullWidth color="primary" onClick={handleDownloadData}>
        Download Data
      </Button>
    </Box>
  );
};

export default NRELQuerySuccess;
