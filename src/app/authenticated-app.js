import { CssBaseline } from "@material-ui/core";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import { ThemeProvider as StyleProvider } from "styled-components";
import React from "react";

import { ThemeProvider } from "@material-ui/styles";

import EditPost from "../views/Post/EditPost";
import Layout from "../views/Layout";
import LogoutComponent from "../views/Login/Logout";
import MainComponent from "../views/Dashboard/App";
import history from "../history";
import theme from "../themes/theme";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <StyleProvider theme={theme}>
            <Router history={history}>
              <Layout>
                <Switch>
                  <Route path="/post/:uuid/edit" component={EditPost} />
                  <Route path="/logout" component={LogoutComponent} />
                  <Route path="/" component={MainComponent} />
                  <Redirect from="/auth" to="/" />
                </Switch>
              </Layout>
            </Router>
          </StyleProvider>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
