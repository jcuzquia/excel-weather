import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import NRELAPIKEYForm from "../components/NRELAPIKeyForm/NRELAPIKEYForm";
import Link from "../components/ui/Link/Link";
interface Props {
  userUid: string;
}
const Dashboard: React.FC<Props> = ({ userUid }) => {
  const handleNRELWebsite = () => {
    // eslint-disable-next-line no-undef
    window.open("https://developer.nrel.gov/signup/");
  };

  return (
    <Box width={"100%"} sx={{ pt: 3 }}>
      <Box p={4}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1">Enter your NREL API Here:</Typography>
            <Typography variant="body1">
              If you don&apos;t have one, you can get one for free
              <Link onClick={handleNRELWebsite}> here:</Link>
            </Typography>
            <NRELAPIKEYForm userUid={userUid} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
