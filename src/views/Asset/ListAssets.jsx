import { connect } from "react-redux";
import React from "react";

import PropTypes from "prop-types";

import * as actionCreators from "../../actions/asset.creators";

class ListAssets extends React.Component {
  componentDidMount() {
    this.props.retreiveAssets();
  }

  render() {
    const { assets } = this.props;
    return (
      <div>
        {assets.map(asset => (
          <img src={`https://${asset.public_url}`} key={asset.uuid} />
        ))}
      </div>
    );
  }
}

ListAssets.propTypes = {
  assets: PropTypes.any,
  retreiveAssets: PropTypes.func
};

function mapStateToProps(state) {
  return {
    assets: state.hasIn(["app", "assets"])
      ? state.getIn(["app", "assets"]).toJS()
      : []
  };
}

export default connect(mapStateToProps, actionCreators)(ListAssets);
