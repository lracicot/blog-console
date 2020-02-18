import { connect } from "react-redux";
import React from "react";

import PropTypes from "prop-types";

import AddPostModal from "../../components/Post/AddPostModal";
import * as actionCreators from "../../actions/post.creators";

class AddPost extends React.Component {
  save(data) {
    this.props.createPost(data.toJS());
  }

  render() {
    return <AddPostModal onSubmit={this.save.bind(this)} />;
  }
}

AddPost.propTypes = {
  data: PropTypes.any,
  createPost: PropTypes.func,
  classes: PropTypes.object
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, actionCreators)(AddPost);
