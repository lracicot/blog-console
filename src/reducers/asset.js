import { Map, fromJS } from "immutable";
import moment from "moment";
import { assetTypes as assetAction } from "../consts";

const updateAsset = (assets, assetData) =>
  assets.update(
    assets.findIndex(item => item.get("uuid") === assetData.get("uuid")),
    () => assetData
  );

const sortAssets = assets =>
  assets.sort((asset1, asset2) => {
    if (moment(asset1.get("created_at")).isAfter(asset2.get("created_at")))
      return -1;
    else return 1;
  });

export default function(state = Map(), action) {
  switch (action.type) {
    case assetAction.CREATE_ASSET_REQUEST:
      return state.merge({
        isCreating: true
      });
    case assetAction.CREATE_ASSET_FAILURE:
      return state.merge({
        isCreating: false,
        error: action.error.toString()
      });
    case assetAction.CREATE_ASSET_SUCCESS:
      return state
        .merge({
          isCreating: false
        })
        .set(
          "assets",
          sortAssets(state.get("assets", fromJS([])).push(action.data))
        );
    case assetAction.RETREIVE_ASSETS_SUCCESS:
      return state.set("assets", sortAssets(action.data));
    case assetAction.RETREIVE_ASSETS_FAILURE:
      return state.merge({ error: action.error.toString() });
    case assetAction.RETREIVE_ASSET_SUCCESS:
      return state;
    case assetAction.RETREIVE_ASSET_FAILURE:
      return state.merge({ error: action.error.toString() });
    case assetAction.UPDATE_ASSET_REQUEST:
      return state.merge({
        isSaving: true
      });
    case assetAction.UPDATE_ASSET_SUCCESS:
      return state.merge({
        isSaving: false,
        assets: updateAsset(state.get("assets"), action.data)
      });
    case assetAction.UPLOAD_ASSET_FAILURE:
      return state.merge({
        isSaving: false,
        error: action.error.toString()
      });
    case assetAction.UPLOAD_ASSET_REQUEST:
      return state.merge({
        isSaving: true
      });
    case assetAction.UPLOAD_ASSET_SUCCESS:
      return state.merge({
        isSaving: false,
        assets: updateAsset(state.get("assets"), action.data)
      });
    case assetAction.UPDATE_ASSET_FAILURE:
      return state.merge({
        isSaving: false,
        error: action.error.toString()
      });
    case assetAction.DELETE_ASSET_REQUEST:
      return state.setIn(["isDeleting", action.data], true);
    case assetAction.DELETE_ASSET_SUCCESS:
      return state.setIn(["isDeleting", action.data], false).set(
        "assets",
        state
          .get("assets")
          .filter(asset => asset.get("uuid") !== action.data.get("uuid"))
      );
    case assetAction.DELETE_ASSET_FAILURE:
      return state
        .merge({
          error: action.error.toString()
        })
        .setIn(["isDeleting", action.data], false);
    default:
      return state;
  }
}
