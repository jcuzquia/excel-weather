import { Box, Grid, List } from "@mui/material";
import React from "react";
import { DashboardLayout } from "../../components/ui";
import { useNRELApiStore } from "../../../stores/nrel-api/nrel-api.store";
import DashboardOption from "../../components/ui/dashboard/DashboardOption";
import { ThermostatAutoOutlined } from "@mui/icons-material";
const Dashboard: React.FC = () => {
  const nrelResponseQuery = useNRELApiStore((state) => state.nrelResponseQuery);
  return (
    <DashboardLayout>
      <Box width={"100%"} sx={{ pt: 3 }}>
        {nrelResponseQuery && (
          <DashboardOption
            subtitle="NREL Weather Data"
            description="Download the available NREL data from here"
            href="/dashboard/nrel-weather"
            icon={<ThermostatAutoOutlined width={60} />}
          />
        )}
      </Box>
    </DashboardLayout>
  );
};

export default Dashboard;
