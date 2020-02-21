import { connect } from "react-redux";
import React from "react";
import slugify from "slugify";

import PropTypes from "prop-types";

import HeaderBar from "../../components/Layout/Header/HeaderBar";
import Menu from "../../components/Layout/Menu/Menu";
import Error from "../../components/FlashMessage/Error";
import * as actionCreators from "../../actions/post.creators";

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpened: false
    };
  }

  handleMenuOpen() {
    this.setState({ isMenuOpened: true });
  }

  handleMenuClose() {
    this.setState({ isMenuOpened: false });
  }

  componentDidMount() {
    this.props.retreivePosts();
  }

  createPost(data) {
    const jsData = data.toJS();
    this.props.createPost({
      ...jsData,
      slug: slugify(jsData.title).toLowerCase()
    });
  }

  render() {
    const { children, error, posts, isCreatingPost } = this.props;
    const { isMenuOpened } = this.state;

    return (
      <div className="layout">
        {error !== "" && error ? (
          <Error open={true} message={error} />
        ) : (
          <div />
        )}
        <HeaderBar
          handleMenuOpen={this.handleMenuOpen.bind(this)}
          isMenuOpened={isMenuOpened}
        />
        <Menu
          posts={posts}
          handleClose={this.handleMenuClose.bind(this)}
          isOpened={isMenuOpened}
          createPost={this.createPost.bind(this)}
          isCreatingPost={isCreatingPost}
        />
        {children}
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  posts: PropTypes.array,
  retreivePosts: PropTypes.func,
  createPost: PropTypes.func,
  isCreatingPost: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    posts: state.hasIn(["post", "posts"])
      ? state.getIn(["post", "posts"]).toJS()
      : [],
    error: state.hasIn(["app", "error"]) ? state.getIn(["app", "error"]) : "",
    isCreatingPost: state.hasIn(["post", "isCreating"])
      ? state.getIn(["post", "isCreating"])
      : false
  };
}

export default connect(mapStateToProps, actionCreators)(Layout);
