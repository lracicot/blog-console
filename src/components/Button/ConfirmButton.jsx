import React from "react";
import { Button } from "@material-ui/core";
import { ErrorOutline } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";

const ConfirmButton = ({ children, ...rest }) => {
  return (
    <Button {...rest}>
      <ErrorOutline style={{ marginRight: 5 }} />
      {children}
    </Button>
  );
};

ConfirmButton.propTypes = {
  children: PropTypes.node.isRequired
};

export default withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(theme.palette.warning.main),
    backgroundColor: theme.palette.warning.main,
    "&:hover": {
      backgroundColor: theme.palette.warning.dark
    }
  }
}))(ConfirmButton);
