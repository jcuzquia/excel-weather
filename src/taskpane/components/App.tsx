import * as React from "react";
import { Route, HashRouter as Router, Switch } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import LoginPage from "../pages/LoginPage";
import Main from "../pages/Main";
import NRELWeatherPage from "../pages/NRELWeatherPage";
import Signup from "../pages/Signup";
import Progress from "./Progress";
import PrivateRoute from "./Protection/PrivateRoute";
import Layout from "./ui/Layout/Layout";

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
          <Route exact path="/login" component={LoginPage} />
          <PrivateRoute exact path="/dashboard">
            {<Dashboard />}
          </PrivateRoute>
          <PrivateRoute exact path="/nrel-weather">
            {<NRELWeatherPage />}
          </PrivateRoute>
        </Layout>
      </Switch>
    </Router>
  );
};

export default App;
