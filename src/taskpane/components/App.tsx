import * as React from "react";
import Progress from "./Progress";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Main from "../pages/Main";
import Dashboard from "../pages/Dashboard";
import Signup from "../pages/Signup";
import layout from "./ui/Layout/Layout";
import Layout from "./ui/Layout/Layout";
import Login from "../pages/Login";

/* global console, Excel, require  */

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

export const App: React.FC<AppProps> = ({ title, isOfficeInitialized }) => {
  const [authenticated, setAuthenticated] = React.useState(false);
  const click = async () => {
    try {
      await Excel.run(async (context) => {
        /**
         * Insert your Excel code here
         */
        const range = context.workbook.getSelectedRange();

        // Read the range address
        range.load("address");

        // Update the fill color
        range.format.fill.color = "yellow";

        await context.sync();
        console.log(`The range address was ${range.address}.`);
      });
    } catch (error) {
      console.error(error);
    }
  };

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
        </Layout>
      </Switch>
    </Router>
  );
};

export default App;
