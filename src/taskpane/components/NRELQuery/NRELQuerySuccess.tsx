import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionSummary, Box, Typography } from "@mui/material";
import React, { FC } from "react";
import { NRELResponseQuery } from "../../../interfaces/NRELQuery";
import NRELQueryDetails from "./NRELQueryDetails";
interface Props {
  response: NRELResponseQuery;
}

const NRELQuerySuccess: FC<Props> = ({ response }) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  console.log(response);

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Box>
      {response.outputs.map((output) => (
        <Accordion expanded={expanded === output.name} onChange={handleChange(output.name)} key={output.name}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
            <Typography sx={{ flexShrink: 0 }}>{output.displayName}</Typography>
          </AccordionSummary>
          <NRELQueryDetails availableYears={output.availableYears} intervals={output.availableIntervals} />
        </Accordion>
      ))}
    </Box>
  );
};

export default NRELQuerySuccess;
