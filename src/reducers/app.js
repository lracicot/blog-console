import { Map, fromJS } from "immutable";
import { postTypes as postAction, assetTypes as assetAction } from "../consts";
import moment from "moment";

function setState(state = Map(), newState) {
  return state.merge(fromJS(newState));
}
const sortPostOrder = fromJS(["draft", "published", "archived"]);

const sortPosts = posts =>
  posts.sort((post1, post2) => {
    if (
      sortPostOrder.findIndex(status => status === post1.get("status")) <
      sortPostOrder.findIndex(status => status === post2.get("status"))
    )
      return -1;
    if (
      sortPostOrder.findIndex(status => status === post1.get("status")) >
      sortPostOrder.findIndex(status => status === post2.get("status"))
    )
      return 1;
    if (moment(post1.get("created_at")).isAfter(post2.get("created_at")))
      return -1;
    else return 1;
  });

const updatePost = (posts, postData) =>
  posts.update(
    posts.findIndex(item => item.get("uuid") === postData.get("uuid")),
    () => postData
  );

export default function(state = Map(), action) {
  switch (action.type) {
    case "SET_STATE":
      return setState(state, action.state);
    case postAction.CREATE_POST_REQUEST:
      return state.merge({
        isCreating: true
      });
    case postAction.CREATE_POST_FAILURE:
      return state.merge({
        isCreating: false,
        error: action.error.toString()
      });
    case postAction.CREATE_POST_SUCCESS:
      return state.merge({
        isCreating: false,
        posts: sortPosts(state.get("posts").push(action.data))
      });
    case postAction.RETREIVE_POSTS_SUCCESS:
      return state.set("posts", sortPosts(action.data));
    case postAction.RETREIVE_POSTS_FAILURE:
      return state.merge({ error: action.error.toString() });
    case postAction.RETREIVE_POST_SUCCESS:
      return state.set(
        "currentPost",
        action.data.has("content")
          ? action.data.set("content", JSON.parse(action.data.get("content")))
          : action.data
      );
    case postAction.RETREIVE_POST_FAILURE:
      return state.merge({ error: action.error.toString() });
    case postAction.UPDATE_POST_REQUEST:
      return state.merge({
        isSaving: true
      });
    case postAction.UPDATE_POST_SUCCESS:
      return state.merge({
        isSaving: false,
        currentPost: action.data.has("content")
          ? action.data.set("content", JSON.parse(action.data.get("content")))
          : action.data,
        posts: updatePost(state.get("posts"), action.data)
      });
    case postAction.UPDATE_POST_FAILURE:
      return state.merge({
        isSaving: false,
        error: action.error.toString()
      });
    case postAction.PUBLISH_POST_REQUEST:
      return state.merge({
        isPublishing: true
      });
    case postAction.PUBLISH_POST_SUCCESS:
      return state.merge({
        isPublishing: false,
        currentPost: action.data.has("content")
          ? action.data.set("content", JSON.parse(action.data.get("content")))
          : action.data,
        posts: updatePost(state.get("posts"), action.data)
      });
    case postAction.PUBLISH_POST_FAILURE:
      return state.merge({
        isPublishing: false,
        error: action.error.toString()
      });
    case postAction.ARCHIVE_POST_REQUEST:
      return state.merge({
        isArchiving: true
      });
    case postAction.ARCHIVE_POST_SUCCESS:
      return state.merge({
        isArchiving: false,
        currentPost: action.data.has("content")
          ? action.data.set("content", JSON.parse(action.data.get("content")))
          : action.data,
        posts: updatePost(state.get("posts"), action.data)
      });
    case postAction.ARCHIVE_POST_FAILURE:
      return state.merge({
        isArchiving: false,
        error: action.error.toString()
      });
    case postAction.DELETE_POST_REQUEST:
      return state.merge({
        isDeleting: true
      });
    case postAction.DELETE_POST_SUCCESS:
      return state.merge({
        isDeleting: false,
        posts: state
          .get("posts")
          .delete(
            state
              .get("posts")
              .findIndex(item => item.get("uuid") === action.data.get("uuid"))
          )
      });
    case postAction.DELETE_POST_FAILURE:
      return state.merge({
        isDeleting: false,
        error: action.error.toString()
      });
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
        assets: sortPosts(state.get("assets").push(action.data))
      });
    case assetAction.RETREIVE_ASSETS_SUCCESS:
      return state.set("assets", sortPosts(action.data));
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
        assets: updatePost(state.get("assets"), action.data)
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
        assets: updatePost(state.get("assets"), action.data)
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
