import { Map, fromJS } from "immutable";
import { postTypes as postAction } from "../consts";

function setState(state = Map(), newState) {
  return state.merge(fromJS(newState));
}

export default function(state = Map(), action) {
  switch (action.type) {
    case "SET_STATE":
      return setState(state, action.state);
    case postAction.RETREIVE_POSTS_SUCCESS:
      return state.set("posts", action.data);
    case postAction.RETREIVE_POSTS_FAILURE:
      return {
        ...state,
        ...{ error: action.error.toString() }
      };
    case postAction.RETREIVE_POST_SUCCESS:
      console.log();
      return state.set(
        "currentPost",
        action.data.has("content")
          ? action.data.set("content", JSON.parse(action.data.get("content")))
          : action.data
      );
    case postAction.PUBLISH_POST_REQUEST:
      return state.merge({
        isPublishing: true
      });
    case postAction.PUBLISH_POST_SUCCESS:
    case postAction.PUBLISH_POST_FAILURE:
      return state.merge({
        isPublishing: false
      });
    case postAction.RETREIVE_POST_FAILURE:
      return {
        ...state,
        ...{ error: action.error.toString() }
      };
    default:
      return state;
  }
}
