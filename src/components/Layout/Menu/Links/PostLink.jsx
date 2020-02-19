import { ListItem, ListItemText, makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import React from "react";
import moment from "moment";

import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  link: {
    color: "#fafafa",
    textDecoration: "none"
  },
  linkPrimaryPublished: {
    fontSize: "1.2em",
    fontWeight: "bold"
  },
  linkPrimaryDraft: {
    fontSize: "1.2em",
    fontStyle: "italic",
    color: "#bbbbbb"
  },
  linkPrimaryArchived: {
    fontSize: "1.2em",
    color: "#686868"
  },
  linkSecondary: {
    color: "#aaaaaa"
  }
}));

const PostLink = props => {
  const classes = useStyles();

  const { post, ...rest } = props;

  return (
    <NavLink to={`/post/${post.uuid}/edit`} className={classes.link} {...rest}>
      <ListItem button>
        <ListItemText
          classes={{
            primary:
              post.status === "published"
                ? classes.linkPrimaryPublished
                : post.status === "draft"
                ? classes.linkPrimaryDraft
                : classes.linkPrimaryArchived,
            secondary: classes.linkSecondary
          }}
          primary={post.title}
          secondary={
            <React.Fragment>
              {moment(post.created_at).format("YYYY-MM-DD HH:mm")}
              <br />
              <em>{post.status}</em>
            </React.Fragment>
          }
        />
      </ListItem>
    </NavLink>
  );
};

PostLink.propTypes = {
  post: PropTypes.object
};

export default PostLink;
