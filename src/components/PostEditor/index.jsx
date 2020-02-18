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
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => {
  console.log(theme);
  return {
    // container: {
    //   border: "1px solid black"
    // }
  };
});
const defaultProps = {
  // bgcolor: "background.paper",
  borderColor: "grey.400",
  // m: 1,
  border: 1,
  marginTop: 4,
  padding: 1,
  style: { minHeight: 400 }
};

const PostEditor = props => {
  const classes = useStyles();
  let initialEditorState = EditorState.createEmpty();
  if (props.value) {
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
    <div className={classes.root}>
      <Box borderRadius="borderRadius" {...defaultProps}>
        <Editor
          editorState={editorState}
          // onChange={setEditorState}
          onChange={editorState => handleChange(editorState)}
        />
      </Box>
    </div>
  );
};

PostEditor.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func
};

export default PostEditor;
