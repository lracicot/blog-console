import { fromJS } from "immutable";
import { useSelector } from "react-redux";
import React from "react";
import PropTypes from "prop-types";

import { retreiveAssets } from "../../actions/asset.creators";
import { useFetching } from "../../hook";
import SelectAssetModal from "../../components/Asset/SelectAssetModal";

const AssetSelectionModal = ({
  handleSelection,
  handleUpload,
  renderOpenButton
}) => {
  useFetching(retreiveAssets);
  const assets = useSelector(state =>
    state.getIn(["asset", "assets"], fromJS([]))
  ).toJS();

  return (
    <SelectAssetModal
      assets={assets}
      handleUpload={handleUpload}
      handleSelection={handleSelection}
      renderOpenButton={renderOpenButton}
    />
  );
};

AssetSelectionModal.propTypes = {
  renderOpenButton: PropTypes.func.isRequired,
  handleSelection: PropTypes.func,
  handleUpload: PropTypes.func
};

export default AssetSelectionModal;
