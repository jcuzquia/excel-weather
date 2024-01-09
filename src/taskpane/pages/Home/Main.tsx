import { Dashboard, MapOutlined, Thermostat } from "@mui/icons-material";
import { Box, List } from "@mui/material";
import React from "react";
import { MainListItem } from "../../components";
import Header from "../../components/Header";
import { useAuthStore } from "../../../stores/auth/auth.store";

const Main: React.FC = () => {
  const user = useAuthStore((state) => state.checkAuthStatus());
  return (
    <Box>
      <Header />
      <Box width={"100%"}>
        <List sx={{ width: "100%" }}>
          {user && (
            <>
              <MainListItem icon={<Dashboard />} title="Dashboard" href="/dashboard" />
              <MainListItem icon={<Thermostat />} title="NREL Weather Data" href={"/dashboard/nrel-weather"} />
              <MainListItem icon={<MapOutlined />} title="Heat Maps" href="/" />
            </>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default Main;
