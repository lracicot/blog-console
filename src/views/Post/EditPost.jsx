import { Container } from "@material-ui/core";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { fromJS } from "immutable";

import PropTypes from "prop-types";

import EditPostForm from "../../components/Post/EditPostForm";
import Spinner from "../../components/Spinner/Spinner";
import * as assetCreators from "../../actions/asset.creators";
import history from "../../history";
import * as postCreators from "../../actions/post.creators";
import { postTypes } from "../../consts";

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

  retreivePost(uuid) {
    this.props.retreivePost(uuid);
  }

  componentDidMount() {
    this.retreivePost(this.state.postUuid);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.uuid !== this.props.match.params.uuid) {
      this.setState({
        postUuid: this.props.match.params.uuid
      });
      this.retreivePost(this.props.match.params.uuid);
    }
  }

  save(data) {
    const jsData = data.delete("updated_at").toJS();
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

  handleDelete() {
    if (this.props.post.header_image) {
      this.props.deleteAsset(this.props.post.header_image.uuid);
    }
    this.props
      .deletePost(this.state.postUuid)
      .then(() => history.push(`/posts`));
  }

  handleUpload(file, data) {
    this.props.createAsset(file, data, { post: this.state.postUuid });
  }

  // handleFileDelete(uuid) {
  //   this.props.deleteAsset(uuid);
  // }

  render() {
    const {
      post,
      classes,
      isPublishing,
      isArchiving,
      isSaving,
      isDeleting
    } = this.props;
    if (post) {
      return (
        <Container maxWidth="xl" className={classes.formContainer}>
          <EditPostForm
            initialValues={post}
            onSubmit={this.save.bind(this)}
            handleArchive={this.handleArchive.bind(this)}
            handlePublish={this.handlePublish.bind(this)}
            handleDelete={this.handleDelete.bind(this)}
            handleUpload={this.handleUpload.bind(this)}
            isPublishing={isPublishing}
            isArchiving={isArchiving}
            isDeleting={isDeleting}
            isSaving={isSaving}
            websiteUrl={postTypes.POST_URL}
          />
        </Container>
      );
    } else {
      return <Spinner />;
    }
  }
}

EditPost.propTypes = {
  post: PropTypes.any,
  isPublishing: PropTypes.bool,
  isArchiving: PropTypes.bool,
  isDeleting: PropTypes.bool,
  isSaving: PropTypes.bool,
  retreivePost: PropTypes.func,
  archivePost: PropTypes.func,
  publishPost: PropTypes.func,
  updatePost: PropTypes.func,
  deletePost: PropTypes.func,
  match: PropTypes.object,
  classes: PropTypes.object,
  retreiveAsset: PropTypes.func,
  deleteAsset: PropTypes.func,
  createAsset: PropTypes.func
};

function mapStateToProps(state) {
  return {
    post: state.hasIn(["post", "currentPost"])
      ? state.getIn(["post", "currentPost"]).toJS()
      : null,
    isPublishing: state.hasIn(["post", "isPublishing"])
      ? state.getIn(["post", "isPublishing"])
      : false,
    isArchiving: state.hasIn(["post", "isArchiving"])
      ? state.getIn(["post", "isArchiving"])
      : false,
    isSaving: state.hasIn(["post", "isSaving"])
      ? state.getIn(["post", "isSaving"])
      : false,
    isDeleting: state.hasIn(["post", "posts"])
      ? (
          state
            .getIn(["post", "posts"])
            .find(
              post =>
                post.get("uuid") ===
                state.getIn(["post", "currentPost", "uuid"])
            ) || fromJS({})
        ).get("isDeleting")
      : false
  };
}

export default connect(mapStateToProps, { ...postCreators, ...assetCreators })(
  withStyles(styles)(EditPost)
);
