import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import React, { useRef, useEffect } from "react";

import PropTypes from "prop-types";

import EditAssetForm from "./EditAssetForm";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: "#ffffff",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const FormModal = props => {
  const classes = useStyles();
  const { children, updateAsset, isSaving, asset } = props;
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const prevIsCreatingRef = useRef();
  useEffect(() => {
    prevIsCreatingRef.current = isSaving;
  });
  let prevIsCreating = prevIsCreatingRef.current;

  if (prevIsCreating && !isSaving) {
    prevIsCreatingRef.current = false;
    handleClose();
  }

  return (
    <div>
      <div onClick={handleOpen}>{children}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <EditAssetForm
              onSubmit={updateAsset}
              isSaving={isSaving}
              asset={asset}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

FormModal.propTypes = {
  children: PropTypes.node,
  updateAsset: PropTypes.func,
  isSaving: PropTypes.bool,
  asset: PropTypes.any
};

export default FormModal;
