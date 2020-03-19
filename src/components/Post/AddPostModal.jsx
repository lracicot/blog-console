import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import React, { useRef, useEffect } from "react";
import slugify from "slugify";

import PropTypes from "prop-types";

import AddPostForm from "./AddPostForm";

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
  const { renderAddButton, createPost, isCreating } = props;
  const [open, setOpen] = React.useState(false);

  const handleCreatePost = data => {
    const jsData = data.toJS();
    createPost({
      ...jsData,
      slug: slugify(jsData.title).toLowerCase()
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const prevIsCreatingRef = useRef();
  useEffect(() => {
    prevIsCreatingRef.current = isCreating;
  });
  let prevIsCreating = prevIsCreatingRef.current;

  if (prevIsCreating && !isCreating) {
    prevIsCreatingRef.current = false;
    handleClose();
  }

  return (
    <div>
      {renderAddButton(handleOpen)}
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
            <AddPostForm onSubmit={handleCreatePost} isCreating={isCreating} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

FormModal.propTypes = {
  renderAddButton: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
  isCreating: PropTypes.bool
};

export default FormModal;
