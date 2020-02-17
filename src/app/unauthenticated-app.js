import React from "react";
import PropTypes from "prop-types";
import { withOAuth } from "aws-amplify-react";
import Spinner from "../components/Spinner/Spinner";

class App extends React.Component {
  getCode(location) {
    return new URLSearchParams(location.search).get("code");
  }

  signIn() {
    const { OAuthSignIn, hydrating } = this.props;
    const code = this.getCode(window.location);
    // console.log(code, hydrating);
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
    return <Spinner />;
  }
}

App.propTypes = {
  OAuthSignIn: PropTypes.func.isRequired,
  hydrating: PropTypes.bool.isRequired
};

export default withOAuth(App);
