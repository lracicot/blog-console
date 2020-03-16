import { css } from "emotion";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import React from "react";
import PropTypes from "prop-types";

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.isCode) {
    attributes.className = css`
      ${Object.keys(atomDark).map(prop => leaf[prop] && atomDark[prop])}
    `;
  }

  return <span {...attributes}>{children}</span>;
};

Leaf.propTypes = {
  attributes: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
  leaf: PropTypes.any.isRequired
};

export default Leaf;
