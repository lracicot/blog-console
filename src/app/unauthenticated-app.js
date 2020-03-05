import { ThemeProvider } from "styled-components";
import { withOAuth } from "aws-amplify-react";
import React from "react";

import PropTypes from "prop-types";

import Spinner from "../components/Spinner/Spinner";
import theme from "../themes/theme";

class App extends React.Component {
  getCode(location) {
    return new URLSearchParams(location.search).get("code");
  }

  signIn() {
    const { OAuthSignIn, hydrating } = this.props;
    const code = this.getCode(window.location);
    if (!code && !hydrating) {
      OAuthSignIn();
    }
  }
  componentDidMount() {
    this.signIn();
  }

  componentDidUpdate() {
    this.signIn();
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Spinner />
      </ThemeProvider>
    );
  }
}

App.propTypes = {
  OAuthSignIn: PropTypes.func.isRequired,
  hydrating: PropTypes.bool.isRequired
};

export default withOAuth(App);
