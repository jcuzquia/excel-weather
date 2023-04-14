import App from "./components/App";
import { AppContainer } from "react-hot-loader";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./styles/theme";
import { Provider } from "react-redux";
import { createFirestoreInstance } from "redux-firestore";
import store from "../redux/store";
import { ReactReduxFirebaseProvider, ReactReduxFirebaseProviderProps } from "react-redux-firebase";
import { firebaseApp } from "../firebase/config";

/* global document, Office, module, require */

let isOfficeInitialized = false;

const title = "Contoso Task Pane Add-in";

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

const rrfProps: ReactReduxFirebaseProviderProps = {
  initializeAuth: true,
  firebase: firebaseApp,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppContainer>
            <Component title={title} isOfficeInitialized={isOfficeInitialized} />
          </AppContainer>
        </ThemeProvider>
      </ReactReduxFirebaseProvider>
    </Provider>,
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
