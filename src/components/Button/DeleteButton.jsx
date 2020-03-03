// import React, { useState } from "react";
import React from "react";

import PropTypes from "prop-types";

import LoadingButton from "./LoadingButton";

const DeleteButton = props => {
  // const [confirming, setConfirming] = useState(false);
  const { handleDelete, ...rest } = props;

  const deleteAction = () => {
    if (window.confirm("Are you sure?")) {
      handleDelete();
    }
  };

  return <LoadingButton onClick={deleteAction} {...rest} />;
};

DeleteButton.propTypes = {
  handleDelete: PropTypes.func.isRequired
};

export default DeleteButton;
