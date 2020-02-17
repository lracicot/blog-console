import { AccountCircle } from "@material-ui/icons";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  makeStyles,
  useTheme
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import moment from "moment";

import PropTypes from "prop-types";
import clsx from "clsx";

import Error from "../../FlashMessage/Error";

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
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
  drawer: {
    width: drawerWidth,
    flexShrink: 0
    // backgroundColor: "#2c3645"
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  link: {
    color: "#fafafa",
    textDecoration: "none"
  },
  linkPrimary: {
    fontSize: "1.2em",
    fontWeight: "bold"
  },
  linkSecondary: {
    color: "#aaaaaa"
  }
}));

const Header = props => {
  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const myAccountOpen = Boolean(anchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { error, posts } = props;

  return (
    <React.Fragment>
      {error !== "" && error ? <Error open={true} message={error} /> : <div />}
      <AppBar
        position="static"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
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
              <NavLink to="/logout">Logout</NavLink>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key="dashboard">
            <NavLink to="/" className={classes.link}>
              <ListItemText
                classes={{
                  primary: classes.linkPrimary,
                  secondary: classes.linkSecondary
                }}
                primary="Dashboard"
              />
            </NavLink>
          </ListItem>
        </List>
        <Divider />
        <List>
          {posts.map(post => (
            <ListItem button key={post.uuid}>
              <NavLink to={`/post/${post.uuid}/edit`} className={classes.link}>
                <ListItemText
                  classes={{
                    primary: classes.linkPrimary,
                    secondary: classes.linkSecondary
                  }}
                  primary={post.title}
                  secondary={moment(post.created_at).format("YYYY-MM-DD HH:mm")}
                />
              </NavLink>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </React.Fragment>
  );
};

Header.propTypes = {
  styles: PropTypes.object,
  handleChangeRequestNavDrawer: PropTypes.func,
  actions: PropTypes.any,
  appStore: PropTypes.any,
  error: PropTypes.string,
  posts: PropTypes.array
};

export default Header;
