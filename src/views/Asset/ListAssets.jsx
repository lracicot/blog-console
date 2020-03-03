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
    const { assets, deleteAsset, createAsset, isDeleting } = this.props;
    if (assets.length) {
      return (
        <AssetsList
          assets={assets}
          handleDelete={deleteAsset}
          handleUpload={createAsset}
          isDeleting={isDeleting}
        />
      );
    } else {
      return <Spinner />;
    }
  }
}

ListAssets.propTypes = {
  assets: PropTypes.any,
  retreiveAssets: PropTypes.func,
  deleteAsset: PropTypes.func,
  createAsset: PropTypes.func,
  isDeleting: PropTypes.array
};

function mapStateToProps(state) {
  return {
    assets: state.hasIn(["asset", "assets"])
      ? state.getIn(["asset", "assets"]).toJS()
      : [],
    isDeleting: state.hasIn(["asset", "isDeleting"])
      ? state.getIn(["asset", "isDeleting"]).toJS()
      : []
  };
}

export default connect(mapStateToProps, actionCreators)(ListAssets);
