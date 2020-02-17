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
      return state.set("currentPost", action.data);
    case postAction.RETREIVE_POST_FAILURE:
      return {
        ...state,
        ...{ error: action.error.toString() }
      };
    default:
      return state;
  }
}