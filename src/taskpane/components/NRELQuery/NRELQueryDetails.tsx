import { AccordionDetails, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { FC } from "react";
import IntervalContainer from "./IntervalContainer";
import YearsAvailableContainer from "./YearsAvailableContainer";
import ParameterContainer from "./ParameterContainer";
import { fullDiscAttributes } from "../../../interfaces/NRELQuery";
interface Props {
  intervals: Array<number>;
  availableYears: Array<string | number>;
}

const NRELQueryDetails: FC<Props> = ({ intervals, availableYears }) => {
  return (
    <AccordionDetails>
      <Paper>
        <Grid container>
          <Grid xs={3}>
            <IntervalContainer intervals={intervals} />
          </Grid>
          <Grid xs={3}>
            <YearsAvailableContainer yearsAvailable={availableYears} />
          </Grid>
          <Grid xs={6}>
            <ParameterContainer parameters={fullDiscAttributes} />
          </Grid>
        </Grid>
      </Paper>
    </AccordionDetails>
  );
};

export default NRELQueryDetails;
