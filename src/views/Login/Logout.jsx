import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Auth } from "aws-amplify";

// Actions
import { deleteProfile } from "../../actions/cognito.actions";

class Logout extends React.Component {
  componentDidMount() {
    const { logout } = this.props;
    Auth.signOut().then(logout);
  }
  render() {
    return "Signing out";
  }
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    logout: () => dispatch(deleteProfile())
  };
};

export default connect(null, mapDispatchToProps)(Logout);
