import { Button } from "@material-ui/core";
import { Done } from "@material-ui/icons";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

import PropTypes from "prop-types";

const LoadingButton = props => {
  const {
    isLoading,
    isDone,
    children,
    disabled,
    type,
    variant,
    color,
    renderActionIcon,
    ...rest
  } = props;

  return (
    <Button
      disabled={isLoading || disabled}
      type={type}
      variant={variant}
      color={color}
      {...rest}
    >
      {isLoading ? (
        <CircularProgress size={24} style={{ marginRight: 5 }} color="grey" />
      ) : (
        ""
      )}
      {isDone && !isLoading ? <Done style={{ marginRight: 5 }} /> : ""}
      {renderActionIcon && !isDone && !isLoading ? renderActionIcon() : ""}
      {children}
    </Button>
  );
};

LoadingButton.defaultProps = {
  type: "button",
  variant: "contained",
  color: "secondary",
  isDone: false,
  isLoading: false,
  renderActionIcon: null
};

LoadingButton.propTypes = {
  isLoading: PropTypes.bool,
  isDone: PropTypes.bool,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
  renderActionIcon: PropTypes.func
};

export default LoadingButton;
