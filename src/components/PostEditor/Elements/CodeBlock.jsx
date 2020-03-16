import { css } from "emotion";
import React from "react";
import PropTypes from "prop-types";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ attributes, children }) => {
  return (
    <pre
      className={css`
        ${atomDark['pre[class*="language-"]']}
      `}
    >
      <code
        {...attributes}
        className={css`
          ${atomDark['code[class*="language-"]']}
        `}
      >
        {children}
      </code>
    </pre>
  );
};

CodeBlock.propTypes = {
  attributes: PropTypes.any,
  children: PropTypes.any
};

export default CodeBlock;
