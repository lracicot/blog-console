import * as Actions from "./asset.actions";
import { assetTypes } from "../consts";
import {
  getProtectedData,
  putProtectedData,
  postProtectedData,
  deleteProtectedData,
  postBinaryData
} from "./data.creators";

export function retreiveAssets() {
  return getProtectedData(
    assetTypes.ASSETS_API.LIST_ASSETS_URL(),
    ["profile", "idToken"],
    Actions.retreiveAssetsSuccess,
    Actions.retreiveAssetsFailure
  );
}

export function retreiveAsset(uuid) {
  return getProtectedData(
    assetTypes.ASSETS_API.RETREIVE_ASSET_URL(uuid),
    ["profile", "idToken"],
    Actions.retreiveAssetSuccess,
    Actions.retreiveAssetFailure
  );
}

export function updateAsset(uuid, data) {
  return dispatch => {
    dispatch(Actions.updateAssetsRequest(uuid));
    dispatch(
      putProtectedData(
        assetTypes.ASSETS_API.UPDATE_ASSET_URL(uuid),
        data,
        ["profile", "idToken"],
        Actions.updateAssetsSuccess,
        Actions.updateAssetsFailure
      )
    );
  };
}

export function uploadAsset(uuid, data, type) {
  return dispatch => {
    dispatch(Actions.uploadAssetsRequest(uuid));
    dispatch(
      postBinaryData(
        assetTypes.ASSETS_API.UPLOAD_ASSET_URL(uuid),
        data,
        type,
        ["profile", "idToken"],
        Actions.uploadAssetsSuccess,
        Actions.uploadAssetsFailure
      )
    );
  };
}

export function createAsset(file, content) {
  return dispatch => {
    dispatch(Actions.createAssetsRequest());
    dispatch(
      postProtectedData(
        assetTypes.ASSETS_API.CREATE_ASSET_URL(),
        { title: file.name },
        ["profile", "idToken"],
        Actions.createAssetsSuccess,
        Actions.createAssetsFailure
      )
    ).then(data => uploadAsset(data.uuid, content, file.type)(dispatch));
  };
}

export function deleteAsset(uuid) {
  return dispatch => {
    dispatch(Actions.deleteAssetsRequest(uuid));
    dispatch(
      deleteProtectedData(
        assetTypes.ASSETS_API.DELETE_ASSET_URL(uuid),
        {},
        ["profile", "idToken"],
        Actions.deleteAssetsSuccess,
        Actions.deleteAssetsFailure
      )
    );
  };
}
