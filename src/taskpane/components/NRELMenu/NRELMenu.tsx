import ThermostatOutlinedIcon from "@mui/icons-material/ThermostatOutlined";
import { Avatar, Box, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import Link from "../ui/Link/Link";

const NRELMenu: React.FC = () => {
  return (
    <Box display={"flex"} pt={2} flexDirection={"column"}>
      <Typography variant="h5" textAlign={"center"}>
        What would you like to do?
      </Typography>
      <Divider />
      <Box display={"flex"} flexDirection={"column"} width={"100%"} mt={2}>
        <Paper sx={{ p: 1 }}>
          <Box display={"flex"} flexGrow={1} alignItems={"center"} justifyContent={"center"} gap={2}>
            <Box>
              <Avatar>
                <ThermostatOutlinedIcon />
              </Avatar>
            </Box>
            <Box flexGrow={1}>
              <Link href="/nrel-weather">
                <Typography variant="body1">Get Available Weather Data</Typography>
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default NRELMenu;
