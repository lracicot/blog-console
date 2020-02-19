import { AccountCircle } from "@material-ui/icons";
import { Menu, MenuItem, Typography, makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";

import PropTypes from "prop-types";
import clsx from "clsx";

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  link: {
    color: "#fafafa",
    textDecoration: "none"
  }
}));

const HeaderBar = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const myAccountOpen = Boolean(anchorEl);
  const { handleMenuOpen, isMenuOpened } = props;

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: isMenuOpened
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleMenuOpen}
          edge="start"
          className={clsx(classes.menuButton, isMenuOpened && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap className={clsx(classes.title)}>
          Blog
        </Typography>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={myAccountOpen}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <NavLink className={classes.link} to="/logout">
              Logout
            </NavLink>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

HeaderBar.propTypes = {
  handleMenuOpen: PropTypes.func.isRequired,
  isMenuOpened: PropTypes.bool.isRequired
};

export default HeaderBar;
