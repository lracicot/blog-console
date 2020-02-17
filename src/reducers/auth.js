import {
  SWITCH_USER,
  UPDATE_PROFILE,
  DELETE_PROFILE
} from "../actions/cognito.actions";

export function user(state = {}, action) {
  switch (action.type) {
    case SWITCH_USER:
      return action.user;
    default:
      return state;
  }
}

export function profile(state = {}, action) {
  switch (action.type) {
    case UPDATE_PROFILE:
      return Object.assign({}, state, action.profile);
    case DELETE_PROFILE:
      return null;
    default:
      return state;
  }
}
