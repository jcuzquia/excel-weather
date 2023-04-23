import { Box, Grid } from "@mui/material";
import React from "react";
import NRELAPIKEYForm from "../components/NRELAPIKeyForm/NRELAPIKEYForm";
const Dashboard: React.FC = () => {
  return (
    <Box width={"100%"} sx={{ pt: 3 }}>
      <Box p={1}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <NRELAPIKEYForm />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
