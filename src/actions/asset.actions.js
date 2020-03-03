import { fromJS } from "immutable";
import { assetTypes as Action } from "../consts";

export function retreiveAssetsSuccess(assets) {
  return {
    type: Action.RETREIVE_ASSETS_SUCCESS,
    data: fromJS(assets)
  };
}

export function retreiveAssetsFailure(error) {
  return {
    type: Action.RETREIVE_ASSETS_FAILURE,
    error: fromJS(error)
  };
}

export function retreiveAssetSuccess(asset) {
  return {
    type: Action.RETREIVE_ASSET_SUCCESS,
    data: fromJS(asset)
  };
}

export function retreiveAssetFailure(error) {
  return {
    type: Action.RETREIVE_ASSET_FAILURE,
    error: fromJS(error)
  };
}

export function updateAssetsRequest(uuid) {
  return {
    type: Action.UPDATE_ASSET_REQUEST,
    data: uuid
  };
}

export function updateAssetsSuccess(assets) {
  return {
    type: Action.UPDATE_ASSET_SUCCESS,
    data: fromJS(assets)
  };
}

export function updateAssetsFailure(error) {
  return {
    type: Action.UPDATE_ASSET_FAILURE,
    error: fromJS(error)
  };
}

export function uploadAssetsRequest(uuid) {
  return {
    type: Action.UPLOAD_ASSET_REQUEST,
    data: uuid
  };
}

export function uploadAssetsSuccess(asset) {
  return {
    type: Action.UPLOAD_ASSET_SUCCESS,
    data: fromJS(asset)
  };
}

export function uploadAssetsFailure(error) {
  return {
    type: Action.UPLOAD_ASSET_FAILURE,
    error: fromJS(error)
  };
}

export function createAssetsRequest() {
  return {
    type: Action.CREATE_ASSET_REQUEST
  };
}

export function createAssetsSuccess(asset) {
  return {
    type: Action.CREATE_ASSET_SUCCESS,
    data: fromJS(asset)
  };
}

export function createAssetsFailure(error) {
  return {
    type: Action.CREATE_ASSET_FAILURE,
    error: fromJS(error)
  };
}

export function deleteAssetsRequest(uuid) {
  return {
    type: Action.DELETE_ASSET_REQUEST,
    data: uuid
  };
}

export function deleteAssetsSuccess(asset) {
  return {
    type: Action.DELETE_ASSET_SUCCESS,
    data: fromJS(asset)
  };
}

export function deleteAssetsFailure(error) {
  return {
    type: Action.DELETE_ASSET_FAILURE,
    error: fromJS(error)
  };
}
