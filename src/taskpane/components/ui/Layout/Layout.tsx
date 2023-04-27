import { Box } from "@mui/material";
import React from "react";
import Navbar from "../AppBar/Navbar";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../firebase/config";
import { getDoc } from "firebase/firestore";
import db from "../../../../firebase/db";
import { useAppDispatch } from "../../../../redux/store";
import { login } from "../../../../redux/userSlice";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const [user] = useAuthState(auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user) {
      getDoc(db.user(user.uid)).then((u) => {
        dispatch(login(u.data()));
      });
    }
    return () => {};
  }, []);

  return (
    <Box width="100%">
      <Navbar />
      {children}
    </Box>
  );
};

export default Layout;
