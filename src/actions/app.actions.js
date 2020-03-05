import { fromJS } from "immutable";
import { appTypes as Action } from "../consts";

export function requestDataStart(url) {
  return {
    type: Action.REQUEST_DATA_START,
    url
  };
}

export function requestDataFailure(error) {
  return {
    type: Action.REQUEST_DATA_FAILURE,
    error: fromJS(error)
  };
}

export function requestDataSuccess(data) {
  return {
    type: Action.REQUEST_DATA_SUCCESS,
    data: fromJS(data)
  };
}

export function handleError(error) {
  return {
    type: Action.HANDLE_ERROR,
    error
  };
}

export function forceAuth() {
  return { type: Action.FORCE_AUTH };
}
