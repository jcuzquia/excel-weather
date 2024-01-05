import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import store from "../redux/store";
import App from "./components/App";
import theme from "./styles/theme";
// eslint-disable-next-line no-redeclare
/* global document, Office, module, require */

let isOfficeInitialized = false;

const title = "Contoso Task Pane Add-in";

const render = (Component) => {
  const queryClient = new QueryClient();
  ReactDOM.render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppContainer>
            <Component title={title} isOfficeInitialized={isOfficeInitialized} />
          </AppContainer>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>,
    document.getElementById("container")
  );
};

/* Render application after Office initializes */
Office.onReady(() => {
  isOfficeInitialized = true;
  render(App);
});

// if ((module as any).hot) {
//   (module as any).hot.accept("./components/App", () => {
//     const NextApp = require("./components/App").default;
//     render(NextApp);
//   });
// }
