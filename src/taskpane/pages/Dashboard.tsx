import { Box, Button, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import excelWeatherApi from "../../api/excel-weatherApi";
import { useFetch } from "../../hooks/useFetch";
import Link from "../components/ui/Link/Link";

const Dashboard = () => {
  const handleNRELWebsite = () => {
    // eslint-disable-next-line no-undef
    window.open("https://developer.nrel.gov/signup/");
  };

  const { status, fetchData, isPending } = useFetch<any>(excelWeatherApi);

  const checkAPI = async () => {
    try {
      fetchData("alt-fuel-stations/v1.json?limit=1&api_key=mp56Z4nzq55AGq6GhvfGAl2gaEVPdPQR2c59dp7W");
    } catch (error) {}
  };
  return (
    <Box width={"100%"} sx={{ pt: 3 }}>
      {/* <Typography variant="h4" textAlign="center">
        NREL Weather data: {documents[0].email}
      </Typography> */}
      <Box component="form" noValidate p={4}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1">Enter your NREL API Here:</Typography>
            <Typography variant="body1">
              If you don&apos;t have one, you can get one for free
              <Link onClick={handleNRELWebsite}> here:</Link>
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="NREL API Key"
              name="nrel_api_key"
              size="small"
            />
            <Button onClick={checkAPI}>{isPending ? <CircularProgress size={"xs"} /> : "Check"}</Button>(
            {status === 200 ? "Your API IS Valid" : "NOt valid"})
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
