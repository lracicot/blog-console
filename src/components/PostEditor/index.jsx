import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw
} from "draft-js";
import { fromJS } from "immutable";
import Box from "@material-ui/core/Box";
import React from "react";

import PropTypes from "prop-types";

const defaultProps = {
  borderColor: "grey.400",
  border: 1,
  marginTop: 4,
  padding: 1,
  style: { minHeight: 400 }
};

const PostEditor = props => {
  const { value, onChange, disabled } = props;
  let initialEditorState = EditorState.createEmpty();
  if (value) {
    initialEditorState = EditorState.createWithContent(
      convertFromRaw(value.toJS())
    );
  }
  const [editorState, setEditorState] = React.useState(initialEditorState);

  const handleChange = editorState => {
    setEditorState(editorState);
    onChange(fromJS(convertToRaw(editorState.getCurrentContent())));
  };
  const _onBoldClick = () => {
    handleChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  return (
    <div>
      <button onClick={_onBoldClick.bind(this)}>Bold</button>
      <Box borderRadius="borderRadius" {...defaultProps}>
        <Editor
          editorState={editorState}
          readOnly={disabled}
          onChange={editorState => handleChange(editorState)}
        />
      </Box>
    </div>
  );
};
PostEditor.defaultProps = {
  disabled: false
};

PostEditor.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
};

export default PostEditor;
