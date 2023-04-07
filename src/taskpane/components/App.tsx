import * as React from "react";
import Header from "./Header";
import Progress from "./Progress";
import Button from "@mui/material/Button";
import LoginForm from "./LoginForm/LoginForm";

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
    return (
      <Progress
        title={title}
        logo={require("./../../../assets/logo-filled.png")}
        message="Please sideload your addin to see app body."
      />
    );
  }

  return (
    <div className="ms-welcome">
      <Header />
      {!authenticated && <LoginForm />}
    </div>
  );
};

export default App;
