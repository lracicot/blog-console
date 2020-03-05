import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

function Dashboard() {
  const codeString = `export default function(state = Map(), action) {
    switch (action.type) {
      case "SET_STATE":
        return setState(state, action.state);
      default:
        return state;
    }
  }
`;
  return (
    <SyntaxHighlighter
      language="javascript"
      showLineNumbers={true}
      style={atomOneDark}
    >
      {codeString}
    </SyntaxHighlighter>
  );
}

export default Dashboard;
