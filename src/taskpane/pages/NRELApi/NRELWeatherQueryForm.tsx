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
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";

import { httpsCallable } from "firebase/functions";
import { useForm } from "react-hook-form";
import { writeWeatherDataToOfficeDocument } from "../../../commands/commands";
import { functions } from "../../../firebase/config";
import { getValidParams } from "../../../helpers/get-valid-params";
import { NRELQueryOutput } from "../../../interfaces/NRELQuery";
import { SelectorOption } from "../../../interfaces/SelectorOptions";
import { useNRELApiStore } from "../../../stores/nrel-api/nrel-api.store";
import { usePlacesStore } from "../../../stores/places/places.store";
import { useUserStore } from "../../../stores/user/user.store";
import ValidParamsCard from "./ValidParams.Card";
import { Progress } from "../../components/ui";

type FormData = {
  selectedResource: string;
  selectedYear: string;
  selectedInterval: string;
};

const NRELWeatherQueryForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { selectedInterval: "", selectedResource: "", selectedYear: "" } });

  const [loading, setLoading] = useState(false);
  const [loadingParams, setLoadingParams] = useState(false);
  const [resource, setResource] = useState("");
  const [selectedOutput, setSelectedOutput] = useState<NRELQueryOutput>(undefined);
  const [validParams, setValidParams] = useState<SelectorOption[]>([]);
  const nrelAPIKey = useUserStore((state) => state.user.nrelAPIKey);
  const nrelEmail = useUserStore((state) => state.user.nrelEmail);
  const nrelResponseQuery = useNRELApiStore((state) => state.nrelResponseQuery);
  const selectedLocation = usePlacesStore((state) => state.selectedLocation);

  const selectedParameters = useNRELApiStore((state) => state.selectedParameters);

  const onFormSubmit = async (_data: FormData) => {
    const generatedUrl = `${selectedOutput.apiUrl}.csv?api_key=${nrelAPIKey}&email=${nrelEmail}&wkt=POINT(${
      selectedLocation.lng
    } ${selectedLocation.lat})&names=${getValues("selectedYear")}&interval=${getValues(
      "selectedInterval"
    )}&attributes=${selectedParameters.join(",")}`;
    console.log(generatedUrl);
    const fetchNRELWeatherData = httpsCallable(functions, "fetchNRELWeatherData");
    setLoading(true);
    try {
      const res = await fetchNRELWeatherData(generatedUrl);
      if (res.data) {
        const ctx = await writeWeatherDataToOfficeDocument(res.data as string, selectedOutput.name);
        ctx.setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const findOutputByResource = (res: string) => {
    const output: NRELQueryOutput = nrelResponseQuery.outputs.find((output) => output.name === res);
    setSelectedOutput(output);
    setValidParams([]);
  };

  const handleResourceChange = (event: SelectChangeEvent) => {
    setResource(event.target.value);
    setValue("selectedYear", "");
    setValue("selectedInterval", "");
    setInterval;
    findOutputByResource(event.target.value);
  };

  const handleOnYearChange = (event: SelectChangeEvent) => {
    setValue("selectedYear", event.target.value);
    updateParameterList();
  };

  const handleOnIntervalChange = (event: SelectChangeEvent) => {
    setValue("selectedInterval", event.target.value);
    updateParameterList();
  };
  const updateParameterList = async () => {
    setLoadingParams(true);
    const selectedResourceApi = selectedOutput.apiUrl;

    if (
      !selectedOutput ||
      selectedResourceApi.trim().length === 0 ||
      !getValues("selectedYear") ||
      !getValues("selectedInterval")
    ) {
      setValidParams([]);
      console.log("Empty Valid params");
    } else {
      const params = await getValidParams(
        selectedResourceApi,
        getValues("selectedYear"),
        getValues("selectedInterval")
      );
      setValidParams(params);
    }
    setLoadingParams(false);
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
              value={resource}
              onChange={handleResourceChange}
              {...register("selectedResource", {
                required: "This field is required",
                onChange: handleResourceChange,
              })}
              error={!!errors.selectedResource}
            >
              {nrelResponseQuery.outputs.map((output) => (
                <MenuItem value={output.name} key={output.displayName}>
                  {output.displayName}
                </MenuItem>
              ))}
            </Select>
            {errors.selectedResource ? <FormHelperText>{errors.selectedResource.message}</FormHelperText> : null}
          </FormControl>
          {selectedOutput && (
            <>
              <Box>
                <FormControl fullWidth sx={{ mb: 1 }} size="small">
                  <InputLabel id="years-label">Available Years</InputLabel>
                  <Select
                    labelId="years-label"
                    id="years"
                    label="Available Years"
                    size="small"
                    autoWidth
                    value={getValues("selectedYear")}
                    {...register("selectedYear", {
                      required: "This field is required",
                      onChange: handleOnYearChange,
                    })}
                    error={!!errors.selectedYear}
                  >
                    {selectedOutput.availableYears.map((year) => (
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
                    value={getValues("selectedInterval")}
                    {...register("selectedInterval", {
                      required: "This field is required",
                      onChange: handleOnIntervalChange,
                    })}
                    error={!!errors.selectedInterval}
                  >
                    {selectedOutput.availableIntervals.map((interval) => (
                      <MenuItem value={interval} key={interval}>
                        {interval}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.selectedInterval ? <FormHelperText>{errors.selectedInterval.message}</FormHelperText> : null}
                </FormControl>
              </Box>
            </>
          )}
        </Box>
      </Paper>
      {loadingParams && (
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} width={"100%"}>
          <Progress title="Loading Parameter" />
        </Box>
      )}
      {validParams && validParams.length > 0 && <ValidParamsCard paramsOptions={validParams} />}

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
