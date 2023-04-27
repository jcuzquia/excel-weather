import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { selectUser } from "../../../redux/userSlice";

interface Props extends RouteProps {
  path: string;
  children: React.ReactNode;
}
const PrivateRoute: FC<Props> = ({ children, ...props }) => {
  const user = useSelector(selectUser);

  return (
    <Route
      {...props}
      render={() => {
        if (user) {
          return children;
        } else {
          return <Redirect to={"/login"} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
