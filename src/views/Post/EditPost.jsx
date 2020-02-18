import { Container } from "@material-ui/core";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import React from "react";

import PropTypes from "prop-types";

import Spinner from "../../components/Spinner/Spinner";
import EditPostForm from "../../components/Post/EditPostForm";
import * as actionCreators from "../../actions/post.creators";

const styles = {
  formContainer: {
    marginTop: "30px"
  }
};

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
    const jsData = data.toJS();
    this.props.updatePost(this.state.postUuid, {
      ...jsData,
      content: JSON.stringify(jsData.content)
    });
  }

  handleArchive() {
    this.props.archivePost(this.state.postUuid);
  }

  handlePublish() {
    this.props.publishPost(this.state.postUuid);
  }

  render() {
    const { data, classes, isPublishing } = this.props;
    if (data) {
      return (
        <Container maxWidth="md" className={classes.formContainer}>
          <EditPostForm
            initialValues={data}
            onSubmit={this.save.bind(this)}
            handleArchive={this.handleArchive.bind(this)}
            handlePublish={this.handlePublish.bind(this)}
            isPublishing={isPublishing}
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
  isPublishing: PropTypes.bool,
  retreivePost: PropTypes.func,
  archivePost: PropTypes.func,
  publishPost: PropTypes.func,
  updatePost: PropTypes.func,
  match: PropTypes.object,
  classes: PropTypes.object
};

function mapStateToProps(state) {
  return {
    data: state.hasIn(["app", "currentPost"])
      ? state.getIn(["app", "currentPost"]).toJS()
      : null,
    isPublishing: state.hasIn(["app", "isPublishing"])
      ? state.getIn(["app", "isPublishing"])
      : false
  };
}

export default connect(
  mapStateToProps,
  actionCreators
)(withStyles(styles)(EditPost));
