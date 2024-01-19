import React, { FC } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { auth } from "../../../firebase/config";
import { CircularProgress } from "@mui/material";

interface Props extends RouteProps {
  path: string;
  children: React.ReactNode;
}
const PrivateRoute: FC<Props> = ({ children, ...props }) => {
  const [user, loading] = useAuthState(auth);
  return (
    <Route
      {...props}
      render={() => {
        if (loading) {
          return (
            <>
              <CircularProgress />
            </>
          );
        } else if (user) {
          return children;
        } else {
          return <Redirect to={"/login"} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
