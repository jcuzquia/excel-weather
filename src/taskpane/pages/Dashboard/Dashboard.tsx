import { Box, Grid, List } from "@mui/material";
import React from "react";
import { DashboardLayout } from "../../components/ui";
import { useNRELApiStore } from "../../../stores/nrel-api/nrel-api.store";
const Dashboard: React.FC = () => {
  const nrelResponseQuery = useNRELApiStore((state) => state.nrelResponseQuery);
  return (
    <DashboardLayout>
      <Box width={"100%"} sx={{ pt: 3 }}>
        <Box p={1}>{JSON.stringify(nrelResponseQuery)}</Box>
      </Box>
    </DashboardLayout>
  );
};

export default Dashboard;
