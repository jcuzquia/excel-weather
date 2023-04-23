import { Box, Typography, Button } from "@mui/material";
import React from "react";
import Header from "../components/Header";
import theme from "../styles/theme";
import { selectUser } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import { getUserData } from "../../helpers/sso-helper";
import { writeDataToOfficeDocument } from "../../commands/commands";

const Main: React.FC = () => {
  const user = useSelector(selectUser);
  const handleClick = async () => {
    await getUserData(writeDataToOfficeDocument);
  };
  return (
    <Box>
      <Header />
      <Button onClick={handleClick}>Get User Data</Button>
    </Box>
  );
};

export default Main;
