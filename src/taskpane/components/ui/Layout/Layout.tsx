import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { Navbar } from "..";
import { useAuthStore } from "../../../../stores/auth/auth.store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../../firebase/config";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoggedIn(user);
    });
  }, []);

  return (
    <Box width="100%">
      <Navbar />
      {children}
    </Box>
  );
};

export default Layout;
