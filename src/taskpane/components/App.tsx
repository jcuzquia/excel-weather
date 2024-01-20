import * as React from "react";
import { Route, HashRouter as Router, Switch } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import LoginPage from "../pages/Login/LoginPage";
import Main from "../pages/Home/Main";
import NRELWeatherPage from "../pages/NRELApi/NRELWeatherPage";
import Signup from "../pages/Signup/Signup";
import PrivateRoute from "./Protection/PrivateRoute";
import Layout from "./ui/Layout/Layout";
import { Progress } from "./ui";
import ProfilePage from "../pages/Profile/ProfilePage";
import ProgramDashboard from "../pages/ProgramDashboard/ProgramDashboard";
import HeatMap from "../pages/HeatMap/HeatMap";

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
  authStatus?: string;
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
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute exact path="/dashboard/nrel-weather">
            <NRELWeatherPage />
          </PrivateRoute>
          <PrivateRoute exact path="/program-dashboard">
            <ProgramDashboard />
          </PrivateRoute>
          <PrivateRoute exact path="/program-dashboard/heatmap">
            <HeatMap />
          </PrivateRoute>
          <PrivateRoute exact path="/profile">
            <ProfilePage />
          </PrivateRoute>
        </Layout>
      </Switch>
    </Router>
  );
};

export default App;
