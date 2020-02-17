import { Container } from "@material-ui/core";
import { connect } from "react-redux";
import MUIRichTextEditor from "mui-rte";
import React from "react";

import PropTypes from "prop-types";

import Spinner from "../../components/Spinner/Spinner";
import * as actionCreators from "../../actions/post.creators";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postUuid: props.match.params.uuid
    };
  }
  componentDidMount() {
    console.log(this.state.postUuid);
    this.props.retreivePost(this.state.postUuid);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.uuid !== this.props.match.params.uuid) {
      console.log(this.props.match.params.uuid);
      this.setState({
        postUuid: this.props.match.params.uuid
      });
      this.props.retreivePost(this.props.match.params.uuid);
    }
  }
  save(data) {
    console.log(data);
    this.props.updatePost(this.state.postUuid, {
      content: data,
      title: "Test 3"
    });
  }
  render() {
    const { data } = this.props;
    if (data) {
      return (
        <Container maxWidth="md">
          <MUIRichTextEditor
            label="Type something here..."
            onSave={this.save.bind(this)}
            value={data.content}
            inlineToolbar={true}
          />
        </Container>
      );
    } else {
      return <Spinner />;
    }
  }
}

Editor.propTypes = {
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

export default connect(mapStateToProps, actionCreators)(Editor);
