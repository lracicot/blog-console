import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { ViewList } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles(() => ({
  link: {
    color: "#fafafa",
    textDecoration: "none"
  },
  lightIcon: {
    color: "#fafafa"
  }
}));

const PostsLink = props => {
  const classes = useStyles();
  return (
    <NavLink to="/posts" className={classes.link} {...props}>
      <ListItem button key="posts">
        <ListItemIcon>
          <ViewList className={classes.lightIcon} />
        </ListItemIcon>
        <ListItemText primary="Posts" />
      </ListItem>
    </NavLink>
  );
};

export default PostsLink;
