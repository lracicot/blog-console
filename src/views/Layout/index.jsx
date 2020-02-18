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
    const { children, error, data, redirect } = this.props;

    // if (redirect) {
    //   return <Redirect to={redirect} />;
    // }
    return (
      <div className="layout">
        <Header
          error={error}
          posts={data}
          createPost={this.createPost.bind(this)}
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
  createPost: PropTypes.func
};

function mapStateToProps(state) {
  return {
    data: state.hasIn(["app", "posts"])
      ? state.getIn(["app", "posts"]).toJS()
      : [],
    error: state.hasIn(["app", "error"]) ? state.getIn(["app", "error"]) : ""
  };
}

export default connect(mapStateToProps, actionCreators)(Layout);
