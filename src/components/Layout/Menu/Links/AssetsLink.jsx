import { Collections } from "@material-ui/icons";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
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

const AssetsLink = props => {
  const classes = useStyles();
  return (
    <NavLink to="/assets" className={classes.link} {...props}>
      <ListItem button key="dashboard">
        <ListItemIcon>
          <Collections className={classes.lightIcon} />
        </ListItemIcon>
        <ListItemText primary="Images and files" />
      </ListItem>
    </NavLink>
  );
};

export default AssetsLink;
