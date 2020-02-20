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

const AssetsLink = props => {
  const classes = useStyles();
  return (
    <NavLink to="/assets" className={classes.link} {...props}>
      <ListItem button key="dashboard">
        <ListItemText
          classes={{
            secondary: classes.linkSecondary
          }}
          primary="Images and files"
        />
      </ListItem>
    </NavLink>
  );
};

export default AssetsLink;
