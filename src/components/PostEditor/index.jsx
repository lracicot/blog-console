import React from "react";
import PropTypes from "prop-types";
import {
  Editor,
  EditorState,
  // ContentState,
  convertFromRaw,
  convertToRaw
} from "draft-js";
import { fromJS } from "immutable";

const PostEditor = props => {
  let initialEditorState = EditorState.createEmpty();
  if (props.value) {
    console.log(props.value.toJS());
    initialEditorState = EditorState.createWithContent(
      convertFromRaw(props.value.toJS())
    );
  }
  const [editorState, setEditorState] = React.useState(initialEditorState);

  const handleChange = editorState => {
    setEditorState(editorState);
    props.onChange(fromJS(convertToRaw(editorState.getCurrentContent())));
  };

  return (
    <Editor
      editorState={editorState}
      // onChange={setEditorState}
      onChange={editorState => handleChange(editorState)}
    />
  );
};

PostEditor.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func
};

export default PostEditor;
