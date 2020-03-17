import {
  Code,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatUnderlined,
  LooksOne,
  LooksTwo,
  SettingsEthernet
} from "@material-ui/icons";
import { Editable, Slate, withReact } from "slate-react";
import { createEditor } from "slate";
import { css } from "emotion";
import { fromJS } from "immutable";
import { withHistory } from "slate-history";
import React, { useCallback, useMemo, useState } from "react";

import PropTypes from "prop-types";
import isHotkey from "is-hotkey";

import { getCodeBlockDecorator, withCode } from "./slate-code";
import { withImage } from "./slate-image/with-image";
import BlockButton from "./Toolbar/Buttons/BlockButton";
import Element from "./Elements/Element";
import InsertImageButton from "./Toolbar/Buttons/InsertImageButton";
import Leaf from "./Elements/Leaf";
import MarkButton, { toggleMark } from "./Toolbar/Buttons/MarkButton";
import Toolbar from "./Toolbar/Toolbar";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code"
};

const PostEditor = ({ onChange, handleImageUpload, handleSave, ...props }) => {
  const [value, setValue] = useState(
    props.value
      ? props.value.toJS()
      : [
          {
            type: "paragraph",
            children: [{ text: "" }]
          }
        ]
  );
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const editor = useMemo(
    () => withHistory(withCode(withImage(withReact(createEditor())))),
    []
  );
  const decorate = useCallback(getCodeBlockDecorator(editor), [editor]);

  const handleChange = value => {
    setValue(value);
    onChange(fromJS(value));
  };

  return (
    <Slate editor={editor} value={value} onChange={handleChange}>
      <Toolbar>
        <MarkButton format="bold" icon={<FormatBold />} />
        <MarkButton format="italic" icon={<FormatItalic />} />
        <MarkButton format="underline" icon={<FormatUnderlined />} />
        <MarkButton format="code" icon={<SettingsEthernet />} />
        <BlockButton format="code-block" icon={<Code />} />
        <BlockButton format="heading-one" icon={<LooksOne />} />
        <BlockButton format="heading-two" icon={<LooksTwo />} />
        <BlockButton format="block-quote" icon={<FormatQuote />} />
        <BlockButton format="numbered-list" icon={<FormatListNumbered />} />
        <BlockButton format="bulleted-list" icon={<FormatListBulleted />} />
        <InsertImageButton handleUpload={handleImageUpload} />
      </Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        decorate={decorate}
        className={css`
          max-height: 800px;
          overflow: scroll;
        `}
        placeholder="What's on your mind?"
        spellCheck
        autoFocus
        onKeyDown={event => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              toggleMark(editor, mark);
            }
          }

          if (isHotkey("mod+s", event)) {
            event.preventDefault();
            handleSave();
          }
        }}
      />
    </Slate>
  );
};

PostEditor.propTypes = {
  handleSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  handleImageUpload: PropTypes.func.isRequired,
  value: PropTypes.any
};

export default PostEditor;
