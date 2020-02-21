import { Map } from "immutable";
import { assetTypes as assetAction } from "../consts";

const updateAsset = (posts, postData) =>
  posts.update(
    posts.findIndex(item => item.get("uuid") === postData.get("uuid")),
    () => postData
  );

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
      return state.merge({
        isCreating: false,
        assets: action.data
      });
    case assetAction.RETREIVE_ASSETS_SUCCESS:
      return state.set("assets", action.data);
    case assetAction.RETREIVE_ASSETS_FAILURE:
      return state.merge({ error: action.error.toString() });
    case assetAction.RETREIVE_ASSET_SUCCESS:
      return state.set(
        "currentPost",
        action.data.has("content")
          ? action.data.set("content", JSON.parse(action.data.get("content")))
          : action.data
      );
    case assetAction.RETREIVE_ASSET_FAILURE:
      return state.merge({ error: action.error.toString() });
    case assetAction.UPDATE_ASSET_REQUEST:
      return state.merge({
        isSaving: true
      });
    case assetAction.UPDATE_ASSET_SUCCESS:
      return state.merge({
        isSaving: false,
        currentPost: action.data.has("content")
          ? action.data.set("content", JSON.parse(action.data.get("content")))
          : action.data,
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
        currentPost: action.data.has("content")
          ? action.data.set("content", JSON.parse(action.data.get("content")))
          : action.data,
        assets: updateAsset(state.get("assets"), action.data)
      });
    case assetAction.UPDATE_ASSET_FAILURE:
      return state.merge({
        isSaving: false,
        error: action.error.toString()
      });
    case assetAction.DELETE_ASSET_REQUEST:
      return state.merge({
        isDeleting: true
      });
    case assetAction.DELETE_ASSET_SUCCESS:
      return state.merge({
        isDeleting: false,
        assets: state
          .get("assets")
          .delete(
            state
              .get("assets")
              .findIndex(item => item.get("uuid") === action.data.get("uuid"))
          )
      });
    case assetAction.DELETE_ASSET_FAILURE:
      return state.merge({
        isDeleting: false,
        error: action.error.toString()
      });
    default:
      return state;
  }
}
