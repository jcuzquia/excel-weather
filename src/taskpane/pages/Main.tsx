import { Box, Typography } from "@mui/material";
import React from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import theme from "../styles/theme";

const Main: React.FC = () => {
  const { user } = useSelector(selectUser);
  return (
    <Box>
      <Header />
      {user && <Typography color={theme.palette.error.dark}>{user.email}</Typography>}
    </Box>
  );
};

export default Main;
