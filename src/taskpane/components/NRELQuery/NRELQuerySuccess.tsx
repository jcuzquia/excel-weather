import { Box, Grid } from "@mui/material";
import React, { FC, useState } from "react";
import { NRELResponseQuery } from "../../../interfaces/NRELQuery";
import IntervalSelector from "./IntervalSelector";
import SolarResourceSelector from "./SolarResourceSelector";
import YearsAvailableSelector from "./YearsAvailableSelector";
interface Props {
  response: NRELResponseQuery;
}

const NRELQuerySuccess: FC<Props> = ({ response }) => {
  const [solarResourceValue, setSolarResourceValue] = useState("");
  const [year, setYear] = useState<string | number>("");
  const [interval, setInterval] = useState<string | number>("");

  let availableYears: Array<string | number> | null;
  let intervals: Array<string | number> | null;
  if (response.outputs && solarResourceValue) {
    const foundOuput = response.outputs.find((output) => output.name === solarResourceValue);
    if (foundOuput) {
      availableYears = foundOuput.availableYears;
      intervals = foundOuput.availableIntervals;
    }
  } else {
    availableYears = null;
    intervals = null;
  }
  console.log(availableYears);
  return (
    <Box display={"flex"} flexDirection={"column"} sx={{ m: 2 }} gap={2}>
      <SolarResourceSelector
        setSolarResourceValue={setSolarResourceValue}
        solarResourceValue={solarResourceValue}
        solarResources={response.outputs}
      />
      <Box>
        <Grid container rowGap={2}>
          <Grid item xs={3}>
            <IntervalSelector setInterval={setInterval} intervalValue={interval} intervals={intervals} />
          </Grid>
          <Grid item xs={3}>
            <YearsAvailableSelector setYear={setYear} yearsValue={year} years={availableYears} />
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default NRELQuerySuccess;
