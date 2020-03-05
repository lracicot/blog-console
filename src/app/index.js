import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Auth } from "aws-amplify";

import AuthenticatedApp from "./authenticated-app";
import UnauthenticatedApp from "./unauthenticated-app";
import { updateProfile, switchUser } from "../actions/cognito.actions";
import { handleError } from "../actions/app.actions";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hydrating: true };
    setTimeout(() => this.setState({ hydrating: false }), 2000);
  }

  async hydrateAuth() {
    const { handleError, switchUser, updateProfile } = this.props;
    try {
      const user = await Auth.currentAuthenticatedUser();
      await switchUser(user);
      const profile = await Auth.currentSession();
      await updateProfile(profile);
      this.setState({ hydrating: false });
    } catch (error) {
      handleError(error);
    }
  }

  componentDidMount() {
    this.hydrateAuth();
  }

  componentDidUpdate(prevProps) {
    if (
      !Object.keys(prevProps.user).length &&
      Object.keys(this.props.user).length
    ) {
      this.hydrateAuth();
    }
  }

  render() {
    const { user, profile } = this.props;
    const { hydrating } = this.state;
    return Object.keys(user).length && Object.keys(profile).length ? (
      <AuthenticatedApp user={user} profile={profile} />
    ) : (
      <UnauthenticatedApp hydrating={hydrating} />
    );
  }
}

App.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  switchUser: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
  profile: PropTypes.object,
  user: PropTypes.object
};

function mapStateToProps(state) {
  return {
    profile: state.hasIn(["profile"]) ? state.getIn(["profile"]) : {},
    user: state.hasIn(["user"]) ? state.getIn(["user"]) : {}
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    updateProfile: data => dispatch(updateProfile(data)),
    handleError: data => dispatch(handleError(data)),
    switchUser: data => dispatch(switchUser(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
