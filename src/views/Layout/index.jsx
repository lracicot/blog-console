import { connect } from "react-redux";
import React from "react";

import PropTypes from "prop-types";

import Error from "../../components/FlashMessage/Error";
import HeaderBar from "../../components/Layout/Header/HeaderBar";
import Menu from "../../components/Layout/Menu/Menu";
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

  render() {
    const { children, error, posts, isCreatingPost, createPost } = this.props;
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
          createPost={createPost}
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
