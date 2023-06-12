import * as React from "react";
import { Route, HashRouter as Router, Switch } from "react-router-dom";
import { fetchFirestoreUser, selectUser } from "../../redux/authSlice";
import { useAppDispatch, useTypedSelector } from "../../redux/store";
import Dashboard from "../pages/Dashboard";
import LoginPage from "../pages/LoginPage";
import Main from "../pages/Main";
import NRELWeatherPage from "../pages/NRELWeatherPage";
import Signup from "../pages/Signup";
import Progress from "./Progress";
import PrivateRoute from "./Protection/PrivateRoute";
import Layout from "./ui/Layout/Layout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
  authStatus?: string;
}

export const App: React.FC<AppProps> = ({ title, isOfficeInitialized }) => {
  const [user] = useAuthState(auth);
  const dispatch = useAppDispatch();
  if (!isOfficeInitialized) {
    return <Progress title={title} message="Please sideload your addin to see app body." />;
  }
  React.useEffect(() => {
    if (user) {
      dispatch(fetchFirestoreUser({ id: user.uid }));
    }
  }, [user]);
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
          <PrivateRoute exact path="/nrel-weather">
            <NRELWeatherPage />
          </PrivateRoute>
        </Layout>
      </Switch>
    </Router>
  );
};

export default App;
