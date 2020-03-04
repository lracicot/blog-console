import { Delete } from "@material-ui/icons";
import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";

import ConfirmButton from "./ConfirmButton";
import LoadingButton from "./LoadingButton";

const DeleteButton = ({ handleDelete, isLoading, icon, ...rest }) => {
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setConfirming(false), 4000);
    return () => clearTimeout(timer);
  }, [confirming]);

  return !isLoading && confirming ? (
    <ConfirmButton {...rest} onClick={handleDelete}>
      Confirm
    </ConfirmButton>
  ) : (
    <LoadingButton
      onClick={() => setConfirming(true)}
      isLoading={isLoading}
      renderActionIcon={
        icon ? () => <Delete style={{ marginRight: 4 }} /> : null
      }
      {...rest}
    />
  );
};

DeleteButton.defaultProps = {
  isLoading: false,
  icon: true
};

DeleteButton.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  icon: PropTypes.bool
};

export default DeleteButton;
