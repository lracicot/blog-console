import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import ContentWrapper from "./ContentWrapper";

const Error = props => {
  const [open, setOpen] = React.useState(false);

  if (props.open === true && !open) {
    setTimeout(() => {
      setOpen(true);
    }, 10);
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <ContentWrapper
          onClose={handleClose}
          variant="error"
          message={props.message}
        />
      </Snackbar>
    </div>
  );
};

Error.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
};

export default Error;
