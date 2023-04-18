import * as React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Route, HashRouter as Router, Switch } from "react-router-dom";
import { auth } from "../../firebase/config";
import Dashboard from "../pages/Dashboard";
import LoginPage from "../pages/LoginPage";
import Main from "../pages/Main";
import NRELWeatherPage from "../pages/NRELWeatherPage";
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
  const [user, ,] = useAuthState(auth);
  if (!isOfficeInitialized) {
    return <Progress title={title} message="Please sideload your addin to see app body." />;
  }

  return (
    <Router basename="/">
      <Switch>
        <Layout>
          <Route exact path="/" component={Main} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={LoginPage} />
          <PrivateRoute exact path="/dashboard">
            {user && <Dashboard userUid={user.uid} />}
          </PrivateRoute>
          <PrivateRoute exact path="/nrel-weather">
            {user && <NRELWeatherPage />}
          </PrivateRoute>
        </Layout>
      </Switch>
    </Router>
  );
};

export default App;
