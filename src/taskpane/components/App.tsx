import * as React from "react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Route, HashRouter as Router, Switch } from "react-router-dom";
import { getUserById } from "../../firebase/authUser";
import { auth } from "../../firebase/config";
import { useAppDispatch } from "../../redux/store";
import { login } from "../../redux/userSlice";
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
  authStatus?: string;
}

export const App: React.FC<AppProps> = ({ title, isOfficeInitialized }) => {
  const [user, loading] = useAuthState(auth);
  const dispatch = useAppDispatch();

  if (!isOfficeInitialized) {
    return <Progress title={title} message="Please sideload your addin to see app body." />;
  }

  useEffect(() => {
    console.log("Calling Use Effect");
    if (user) {
      getUserById(user.uid).then(({ user }) => dispatch(login(user)));
    }
  }, [user, loading]);

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
          {/* <PrivateRoute exact path="/nrel-weather/query">
            <NRELWeatherQueryPage />
          </PrivateRoute> */}
        </Layout>
      </Switch>
    </Router>
  );
};

export default App;
