import { fromJS } from "immutable";
import { dataTypes as Action } from "../consts";

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
