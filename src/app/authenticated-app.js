import React from "react";
// import { Router, Route, Switch } from "react-router-dom";
import MainComponent from "../views/Dashboard/App";
import LogoutComponent from "../views/Login/Logout";
import EditPost from "../views/Post/EditPost";
import { ThemeProvider as StyleProvider } from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { ThemeProvider } from "@material-ui/styles";

import Layout from "../views/Layout";
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
            </Layout>
          </Router>
        </StyleProvider>
      </ThemeProvider>
    );
  }
}

export default App;
