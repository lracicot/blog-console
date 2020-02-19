import { Add } from "@material-ui/icons";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles
} from "@material-ui/core";
import React from "react";

import PropTypes from "prop-types";

import AddPostModal from "../../../Post/AddPostModal";

const useStyles = makeStyles(() => ({
  link: {
    color: "#fafafa",
    textDecoration: "none"
  },
  lightIcon: {
    color: "#fafafa"
  }
}));

const NewPostButton = props => {
  const classes = useStyles();

  const { createPost, isCreating, ...rest } = props;

  return (
    <AddPostModal createPost={createPost} isCreating={isCreating}>
      <ListItem button {...rest}>
        <ListItemIcon>
          <Add className={classes.lightIcon} />
        </ListItemIcon>
        <ListItemText className={classes.link} primary="New post" />
      </ListItem>
    </AddPostModal>
  );
};

NewPostButton.propTypes = {
  createPost: PropTypes.func,
  isCreating: PropTypes.bool
};

export default NewPostButton;
