import { connect } from "react-redux";
import React from "react";

import PropTypes from "prop-types";

import Spinner from "../../components/Spinner/Spinner";
import AssetsList from "../../components/Asset/AssetsList";
import * as actionCreators from "../../actions/asset.creators";

class ListAssets extends React.Component {
  componentDidMount() {
    this.props.retreiveAssets();
  }

  render() {
    const { assets } = this.props;
    if (assets.length) {
      return <AssetsList assets={assets} />;
    } else {
      return <Spinner />;
    }
  }
}

ListAssets.propTypes = {
  assets: PropTypes.any,
  retreiveAssets: PropTypes.func
};

function mapStateToProps(state) {
  return {
    assets: state.hasIn(["asset", "assets"])
      ? state.getIn(["asset", "assets"]).toJS()
      : []
  };
}

export default connect(mapStateToProps, actionCreators)(ListAssets);
