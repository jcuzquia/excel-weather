import { Avatar, Box, Typography } from "@mui/material";
import * as React from "react";
import theme from "../styles/theme";

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <section>
      <Box width="100%" sx={{ backgroundColor: theme.palette.primary.dark }} p={3}>
        <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} gap={3}>
          <Box width="100%" display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Avatar sx={{ width: 56, height: 56 }}>EXW</Avatar>
          </Box>
          <Typography variant="h2" textAlign={"center"} color={"white"}>
            Excel Weather
          </Typography>
        </Box>
      </Box>
    </section>
  );
};

export default Header;
