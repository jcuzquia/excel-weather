import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import React, { useState } from "react";

import { httpsCallable } from "firebase/functions";
import { useForm } from "react-hook-form";
import { writeWeatherDataToOfficeDocument } from "../../../commands/commands";
import { functions } from "../../../firebase/config";
import { useNRELApiStore } from "../../../stores/nrel-api/nrel-api.store";
import { usePlacesStore } from "../../../stores/places/places.store";
import { useUserStore } from "../../../stores/user/user.store";
import ValidParamsCard from "./ValidParams.Card";

type FormData = {
  selectedResourceApiUrl: string;
  selectedYear: string;
  selectedInterval: string;
};

const NRELWeatherQueryForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>();
  const [loading, setLoading] = useState(false);

  const nrelAPIKey = useUserStore((state) => state.user.nrelAPIKey);
  const nrelEmail = useUserStore((state) => state.user.nrelEmail);
  const nrelResponseQuery = useNRELApiStore((state) => state.nrelResponseQuery);
  const selectedLocation = usePlacesStore((state) => state.selectedLocation);
  const setSelectedOutput = useNRELApiStore((state) => state.setSelectedOutputBySelectedResource);
  const selectedResourceApi = useNRELApiStore((state) => state.selectedResourceApi);

  const intervals = useNRELApiStore((state) => state.intervals);
  const years = useNRELApiStore((state) => state.years);
  const selectedYear = useNRELApiStore((state) => state.selectedYear);
  const selectedInterval = useNRELApiStore((state) => state.selectedInterval);
  const selectedOutput = useNRELApiStore((state) => state.selectedQueryOutput);
  const setSelectedResourceApi = useNRELApiStore((state) => state.setSelectedResourceApi);
  const setSelectedYear = useNRELApiStore((state) => state.setSelectedYear);
  const setSelectedInterval = useNRELApiStore((state) => state.setSelectedInterval);
  const setSelectedParameters = useNRELApiStore((state) => state.setSelectedParameters);
  const setIntervals = useNRELApiStore((state) => state.setIntervals);
  const setYears = useNRELApiStore((state) => state.setYears);
  const updateIntervals = useNRELApiStore((state) => state.updateIntervals);
  const updateYears = useNRELApiStore((state) => state.updateYears);
  const updateParameterList = useNRELApiStore((state) => state.updateParameterList);
  const validParameters = useNRELApiStore((state) => state.validParameters);
  const selectedParameters = useNRELApiStore((state) => state.selectedParameters);
  const onFormSubmit = async (_data: FormData) => {
    const generatedUrl = `${selectedResourceApi}.csv?api_key=${nrelAPIKey}&email=${nrelEmail}&wkt=POINT(${
      selectedLocation.lng
    } ${selectedLocation.lat})&names=${selectedYear}&interval=${selectedInterval}&attributes=${selectedParameters.join(
      ","
    )}`;
    console.log(generatedUrl);
    const fetchNRELWeatherData = httpsCallable(functions, "fetchNRELWeatherData");
    setLoading(true);
    try {
      const res = await fetchNRELWeatherData(generatedUrl);
      if (res.data) {
        await writeWeatherDataToOfficeDocument(res.data as string, selectedOutput.name);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const updateValues = () => {
    setSelectedYear(getValues("selectedYear"));
    setSelectedInterval(getValues("selectedInterval"));
    setSelectedOutput(getValues("selectedResourceApiUrl"));
    setSelectedResourceApi(getValues("selectedResourceApiUrl"));
    updateIntervals();
    updateYears();
    updateParameterList();
  };

  const onResourceChange = () => {
    setSelectedYear(undefined);
    setSelectedInterval(undefined);
    setSelectedParameters(undefined);

    setSelectedOutput(getValues("selectedResourceApiUrl"));
    setSelectedResourceApi(getValues("selectedResourceApiUrl"));
    updateIntervals();
    updateYears();
    updateParameterList();
  };

  return (
    <Box display={"flex"} flexDirection={"column"} component={"form"} onSubmit={handleSubmit(onFormSubmit)} mb={5}>
      <Paper elevation={1}>
        <Box mt={2} ml={1} mr={1}>
          <FormControl fullWidth sx={{ mb: 1 }} size="small">
            <InputLabel id="resource-label">Resource</InputLabel>
            <Select
              labelId="resource-label"
              id="resource"
              label="Resource"
              autoWidth
              {...register("selectedResourceApiUrl", {
                required: "This field is required",
                onChange: (_e) => {
                  onResourceChange();
                },
              })}
              error={!!errors.selectedResourceApiUrl}
            >
              {nrelResponseQuery.outputs.map((output) => (
                <MenuItem value={output.apiUrl} key={output.apiUrl}>
                  {output.displayName}
                </MenuItem>
              ))}
            </Select>
            {errors.selectedResourceApiUrl ? (
              <FormHelperText>{errors.selectedResourceApiUrl.message}</FormHelperText>
            ) : null}
          </FormControl>

          <Box>
            <FormControl fullWidth sx={{ mb: 1 }} size="small">
              <InputLabel id="years-label">Available Years</InputLabel>
              <Select
                labelId="years-label"
                id="years"
                label="Available Years"
                size="small"
                autoWidth
                {...register("selectedYear", {
                  required: "This field is required",
                  onChange: (_e) => {
                    updateValues();
                  },
                })}
                error={!!errors.selectedYear}
              >
                {years.map((year) => (
                  <MenuItem value={year} key={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
              {errors.selectedYear ? <FormHelperText>{errors.selectedYear.message}</FormHelperText> : null}
            </FormControl>
          </Box>
          <Box>
            <FormControl fullWidth sx={{ mb: 1 }} size="small">
              <InputLabel id="interval-label">Available Intervals</InputLabel>
              <Select
                labelId="interval-label"
                id="interval"
                label="Available intervals"
                size="small"
                autoWidth
                {...register("selectedInterval", {
                  required: "This field is required",
                  onChange: (_e) => {
                    updateValues();
                  },
                })}
                error={!!errors.selectedInterval}
              >
                {intervals.map((interval) => (
                  <MenuItem value={interval} key={interval}>
                    {interval}
                  </MenuItem>
                ))}
              </Select>
              {errors.selectedInterval ? <FormHelperText>{errors.selectedInterval.message}</FormHelperText> : null}
            </FormControl>
          </Box>
        </Box>
      </Paper>
      {validParameters && validParameters.length > 0 && <ValidParamsCard paramsOptions={validParameters} />}

      <Button
        variant="contained"
        size="small"
        fullWidth
        color="primary"
        type="submit"
        sx={{ mt: 1, ml: 1, mr: 1 }}
        disabled={loading}
      >
        {loading ? <CircularProgress /> : "Download"}
      </Button>
    </Box>
  );
};

export default NRELWeatherQueryForm;
