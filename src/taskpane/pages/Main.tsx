import { Box, Typography } from "@mui/material";
import React from "react";
import Header from "../components/Header";
import theme from "../styles/theme";
import { selectUser } from "../../redux/userSlice";
import { useSelector } from "react-redux";

const Main: React.FC = () => {
  const user = useSelector(selectUser);
  console.log("User in Main is: ", user);
  return (
    <Box>
      <Header />
      {user && <Typography color={theme.palette.error.dark}>{user.email}</Typography>}
    </Box>
  );
};

export default Main;
