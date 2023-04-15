import React, { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

interface Props extends RouteProps {
  path: string;
  children: React.ReactNode;
}
const PrivateRoute: FC<Props> = ({ children, ...props }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...props}
      render={() => {
        if (currentUser) {
          return children;
        } else {
          return <Redirect to={"/login"} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
