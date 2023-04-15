import * as React from "react";
import { Route, HashRouter as Router, Switch } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Signup from "../pages/Signup";
import Progress from "./Progress";
import PrivateRoute from "./Protection/PrivateRoute";
import Layout from "./ui/Layout/Layout";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* global console, Excel, require  */

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

export const App: React.FC<AppProps> = ({ title, isOfficeInitialized }) => {
  if (!isOfficeInitialized) {
    return <Progress title={title} message="Please sideload your addin to see app body." />;
  }

  return (
    <Router basename="/">
      <Switch>
        <Layout>
          <Route exact path="/" component={Main} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard">
            <Dashboard />
          </PrivateRoute>
        </Layout>
      </Switch>
    </Router>
  );
};

export default App;
