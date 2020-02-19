import { connect } from "react-redux";
import React from "react";
import slugify from "slugify";

import PropTypes from "prop-types";

import Header from "../../components/Layout/Header";
import * as actionCreators from "../../actions/post.creators";

class Layout extends React.Component {
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
    const { children, error, data, isCreating } = this.props;

    return (
      <div className="layout">
        <Header
          error={error}
          posts={data}
          createPost={this.createPost.bind(this)}
          isCreating={isCreating}
        />
        {children}
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  data: PropTypes.array,
  retreivePosts: PropTypes.func,
  createPost: PropTypes.func,
  isCreating: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    data: state.hasIn(["app", "posts"])
      ? state.getIn(["app", "posts"]).toJS()
      : [],
    error: state.hasIn(["app", "error"]) ? state.getIn(["app", "error"]) : "",
    isCreating: state.hasIn(["app", "isCreating"])
      ? state.getIn(["app", "isCreating"])
      : false
  };
}

export default connect(mapStateToProps, actionCreators)(Layout);
