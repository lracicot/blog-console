import { Container } from "@material-ui/core";
import { connect } from "react-redux";
import React from "react";

import PropTypes from "prop-types";

import PostForm from "./PostForm";
import Spinner from "../../components/Spinner/Spinner";
import * as actionCreators from "../../actions/post.creators";

class EditPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postUuid: props.match.params.uuid
    };
  }
  componentDidMount() {
    this.props.retreivePost(this.state.postUuid);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.uuid !== this.props.match.params.uuid) {
      this.setState({
        postUuid: this.props.match.params.uuid
      });
      this.props.retreivePost(this.props.match.params.uuid);
    }
  }
  save(data) {
    this.props.updatePost(this.state.postUuid, data.toJS());
  }

  render() {
    const { data } = this.props;
    if (data) {
      return (
        <Container maxWidth="md">
          <PostForm
            initialValues={data}
            onSubmit={this.save.bind(this)}
            key={data.slug}
          />
        </Container>
      );
    } else {
      return <Spinner />;
    }
  }
}

EditPost.propTypes = {
  data: PropTypes.any,
  retreivePost: PropTypes.func,
  updatePost: PropTypes.func,
  match: PropTypes.object
};

function mapStateToProps(state) {
  return {
    data: state.hasIn(["app", "currentPost"])
      ? state.getIn(["app", "currentPost"]).toJS()
      : null
  };
}

export default connect(mapStateToProps, actionCreators)(EditPost);
