import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "../../components/Layout/Header";
import * as actionCreators from "../../actions/post.creators";
import slugify from "slugify";

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
    const { children, error, data } = this.props;
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
