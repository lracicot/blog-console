import * as serviceWorker from "./serviceWorker";
import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { Provider as StoreProvider } from "react-redux";
import Amplify, { Hub } from "aws-amplify";
import configureStore from "./store";
import awsconfig from "./aws-exports";
import { switchUser } from "./actions/cognito.actions";
import { handleError } from "./actions/app.actions";
import "./index.css";

const store = configureStore();

Amplify.configure(awsconfig);

Hub.listen("auth", data => {
  switch (data.payload.event) {
    case "signIn":
      store.dispatch(switchUser(data.payload.data));
      break;
    case "signIn_failure":
      store.dispatch(handleError(data.payload.data));
      break;
    default:
      break;
  }
});

ReactDOM.render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
