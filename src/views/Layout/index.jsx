import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "../../components/Layout/Header";
import * as actionCreators from "../../actions/post.creators";

class Layout extends React.Component {
  componentDidMount() {
    this.props.retreivePosts();
  }
  render() {
    const { children, error, data } = this.props;
    return (
      <div className="layout">
        <Header error={error} posts={data} />
        {children}
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  data: PropTypes.array,
  retreivePosts: PropTypes.func
};

function mapStateToProps(state) {
  return {
    data: state.hasIn(["app", "posts"])
      ? state.getIn(["app", "posts"]).toJS()
      : [],
    error: state.hasIn(["app", "error"]) ? state.getIn(["app", "error"]) : ""
  };
}

export default connect(mapStateToProps, actionCreators)(Layout);
