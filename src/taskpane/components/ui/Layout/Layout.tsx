import React from "react";
import { Box } from "@mui/material";
import Navbar from "../AppBar/Navbar";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Box width="100%">
      <Navbar />
      {children}
    </Box>
  );
};

export default Layout;
