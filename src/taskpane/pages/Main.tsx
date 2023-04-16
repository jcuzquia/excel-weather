import { Box, Typography } from "@mui/material";
import React from "react";
import Header from "../components/Header";
import theme from "../styles/theme";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";

const Main: React.FC = () => {
  const [user, ,] = useAuthState(auth);
  return (
    <Box>
      <Header />
      {user && <Typography color={theme.palette.error.dark}>{user.email}</Typography>}
    </Box>
  );
};

export default Main;
