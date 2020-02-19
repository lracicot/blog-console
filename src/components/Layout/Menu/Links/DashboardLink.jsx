import { ListItem, ListItemText, makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import React from "react";

const useStyles = makeStyles(() => ({
  link: {
    color: "#fafafa",
    textDecoration: "none"
  },
  linkSecondary: {
    color: "#aaaaaa"
  }
}));

const DashboardLink = props => {
  const classes = useStyles();
  return (
    <NavLink to="/" className={classes.link} {...props}>
      <ListItem button key="dashboard">
        <ListItemText
          classes={{
            secondary: classes.linkSecondary
          }}
          primary="Dashboard"
        />
      </ListItem>
    </NavLink>
  );
};

export default DashboardLink;
