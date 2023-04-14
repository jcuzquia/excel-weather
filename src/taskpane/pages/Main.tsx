import { Box, Typography } from "@mui/material";
import React from "react";
import useAuth from "../../hooks/useAuth";
import Header from "../components/Header";
import theme from "../styles/theme";

const Main: React.FC = () => {
  const { currentUser } = useAuth();
  return (
    <Box>
      <Header />
      {currentUser && <Typography color={theme.palette.error.dark}>{currentUser.email}</Typography>}
    </Box>
  );
};

export default Main;
