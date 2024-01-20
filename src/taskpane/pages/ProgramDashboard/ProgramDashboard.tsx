import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import DashboardOption from "../../components/ui/dashboard/DashboardOption";
import { MapTwoTone } from "@mui/icons-material";

const ProgramDashboard = () => {
  return (
    <Box display={"flex"} pt={2} pl={1} pr={1} flexDirection={"column"}>
      <Typography variant="subtitle1" color={"white"}>
        Program Team Options
      </Typography>
      <Box display={"flex"} flexDirection={"column"} mt={2}>
        <DashboardOption
          description="Create Heat map for a new type of analysis"
          href="/program-dashboard/heatmap"
          icon={<MapTwoTone height={40} />}
          subtitle="Heat Maps"
        />
      </Box>
    </Box>
  );
};

export default ProgramDashboard;
