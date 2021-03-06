import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles
} from "@material-ui/core";
import React from "react";

import PropTypes from "prop-types";

import AssetsLink from "./Links/AssetsLink";
import DashboardLink from "./Links/DashboardLink";
import MenuHeader from "./MenuHeader";
import NewPostButton from "./Links/NewPostButton";
import PostLink from "./Links/PostLink";
import PostsLink from "./Links/PostsLink";

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.background.menu
  },
  section: {
    color: "#fafafa"
  }
}));

const Menu = props => {
  const classes = useStyles();

  const { posts, createPost, isCreatingPost, handleClose, isOpened } = props;

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={isOpened}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <MenuHeader handleClose={handleClose} />
      <Divider />
      <DashboardLink onClick={handleClose} />
      <Divider />
      <AssetsLink onClick={handleClose} />
      <Divider />
      <PostsLink onClick={handleClose} />
      <Divider />
      <NewPostButton
        createPost={createPost}
        isCreating={isCreatingPost}
        onClick={handleClose}
      />
      <Divider />
      <ListItem>
        <ListItemText className={classes.section} primary="Recent posts" />
      </ListItem>
      <List>
        {posts.map(post => (
          <PostLink post={post} onClick={handleClose} key={post.uuid} />
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

Menu.propTypes = {
  handleClose: PropTypes.func,
  createPost: PropTypes.func,
  isCreatingPost: PropTypes.bool,
  isOpened: PropTypes.bool,
  posts: PropTypes.array
};

export default Menu;
