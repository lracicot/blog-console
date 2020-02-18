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

  render() {
    const { data, classes } = this.props;
    if (data) {
      return (
        <Container maxWidth="md" className={classes.formContainer}>
          <EditPostForm initialValues={data} onSubmit={this.save.bind(this)} />
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
  match: PropTypes.object,
  classes: PropTypes.object
};

function mapStateToProps(state) {
  return {
    data: state.hasIn(["app", "currentPost"])
      ? state.getIn(["app", "currentPost"]).toJS()
      : null
  };
}

export default connect(
  mapStateToProps,
  actionCreators
)(withStyles(styles)(EditPost));
