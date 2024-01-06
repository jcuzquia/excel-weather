import { Box, Grid, List } from "@mui/material";
import React from "react";
import { DashboardLayout } from "../components/ui";
const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <Box width={"100%"} sx={{ pt: 3 }}>
        <Box p={1}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <List></List>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default Dashboard;
