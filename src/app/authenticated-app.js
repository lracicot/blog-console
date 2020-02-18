import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { ThemeProvider as StyleProvider } from "styled-components";
import React from "react";

import { ThemeProvider } from "@material-ui/styles";

import EditPost from "../views/Post/EditPost";
import Layout from "../views/Layout";
import LogoutComponent from "../views/Login/Logout";
import MainComponent from "../views/Dashboard/App";
import theme from "../themes/theme";

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyleProvider theme={theme}>
          <Router>
            <Layout>
              <Route path="/post/:uuid/edit" component={EditPost} />
              <Route path="/logout" component={LogoutComponent} />
              <Route path="/" component={MainComponent} />
              <Redirect from="/auth" to="/" />
            </Layout>
          </Router>
        </StyleProvider>
      </ThemeProvider>
    );
  }
}

export default App;
