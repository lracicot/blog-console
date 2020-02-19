import { makeStyles, useTheme } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";
import React from "react";

import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  lightIcon: {
    color: "#fafafa"
  }
}));

const MenuHeader = props => {
  const theme = useTheme();
  const classes = useStyles();

  const { handleClose } = props;

  return (
    <div className={classes.drawerHeader}>
      <IconButton onClick={handleClose}>
        {theme.direction === "ltr" ? (
          <ChevronLeftIcon className={classes.lightIcon} />
        ) : (
          <ChevronRightIcon className={classes.lightIcon} />
        )}
      </IconButton>
    </div>
  );
};

MenuHeader.propTypes = {
  handleClose: PropTypes.func
};

export default MenuHeader;
