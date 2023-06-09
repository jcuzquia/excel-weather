import App from "./components/App";
import { AppContainer } from "react-hot-loader";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./styles/theme";

/* global document, Office, module, require */

let isOfficeInitialized = false;

const title = "Contoso Task Pane Add-in";

const render = (Component) => {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContainer>
        <Component title={title} isOfficeInitialized={isOfficeInitialized} />
      </AppContainer>
    </ThemeProvider>,
    document.getElementById("container")
  );
};

/* Render application after Office initializes */
Office.onReady(() => {
  isOfficeInitialized = true;
  render(App);
});

if ((module as any).hot) {
  (module as any).hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default;
    render(NextApp);
  });
}
