import { Map, fromJS } from "immutable";
import { postTypes as postAction } from "../consts";
import moment from "moment";

function setState(state = Map(), newState) {
  return state.merge(fromJS(newState));
}

export default function(state = Map(), action) {
  const sortOrder = fromJS(["draft", "published", "archived"]);
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
        isCreating: false
      });
    case postAction.RETREIVE_POSTS_SUCCESS:
      return state.set(
        "posts",
        action.data.sort((post1, post2) => {
          if (
            sortOrder.findIndex(status => status === post1.get("status")) <
            sortOrder.findIndex(status => status === post2.get("status"))
          )
            return -1;
          if (
            sortOrder.findIndex(status => status === post1.get("status")) >
            sortOrder.findIndex(status => status === post2.get("status"))
          )
            return 1;
          if (moment(post1.get("created_at")).isAfter(post2.get("created_at")))
            return -1;
          else return 1;
        })
      );
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
        posts: state.get("posts").update(
          state
            .get("posts")
            .findIndex(item => item.get("uuid") === action.data.get("uuid")),
          () => action.data
        )
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
        posts: state.get("posts").update(
          state
            .get("posts")
            .findIndex(item => item.get("uuid") === action.data.get("uuid")),
          () => action.data
        )
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
        posts: state.get("posts").update(
          state
            .get("posts")
            .findIndex(item => item.get("uuid") === action.data.get("uuid")),
          () => action.data
        )
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
        isDeleting: false
      });
    case postAction.DELETE_POST_FAILURE:
      return state.merge({
        isDeleting: false,
        error: action.error.toString()
      });
    default:
      return state;
  }
}
