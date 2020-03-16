import { Dashboard } from "@material-ui/icons";
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

const DashboardLink = props => {
  const classes = useStyles();
  return (
    <NavLink to="/" className={classes.link} {...props}>
      <ListItem button key="dashboard">
        <ListItemIcon>
          <Dashboard className={classes.lightIcon} />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </NavLink>
  );
};

export default DashboardLink;
