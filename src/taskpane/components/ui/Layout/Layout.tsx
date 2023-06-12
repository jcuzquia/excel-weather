import { Box } from "@mui/material";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../firebase/config";
import { useAppDispatch } from "../../../../redux/store";
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
