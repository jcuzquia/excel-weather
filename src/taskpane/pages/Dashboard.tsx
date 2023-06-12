import { Spinner } from "@fluentui/react";
import { Box, Grid } from "@mui/material";
import React from "react";
import { getStatus, selectUser } from "../../redux/authSlice";
import { useTypedSelector } from "../../redux/store";
import NRELAPIKEYForm from "../components/NRELAPIKeyForm/NRELAPIKEYForm";
const Dashboard: React.FC = () => {
  const user = useTypedSelector(selectUser);
  const state = useTypedSelector(getStatus);

  if (!user) {
    return null;
  }

  return (
    <Box width={"100%"} sx={{ pt: 3 }}>
      <Box p={1}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {state === "loading" ? <Spinner /> : <NRELAPIKEYForm />}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
