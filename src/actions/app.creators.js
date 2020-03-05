import Axios from "axios";
import {
  requestDataStart,
  requestDataFailure,
  requestDataSuccess
} from "./app.actions";

export function requestData(
  url,
  method,
  data,
  onSuccess,
  onFailure,
  tokenPath = null,
  type = null
) {
  return (dispatch, getState) => {
    try {
      dispatch(requestDataStart());
      let headers = {};

      if (tokenPath) {
        headers = {
          Authorization: `Bearer ${getState().getIn(tokenPath).jwtToken}`
        };
      }

      if (type) {
        headers["Content-Type"] = type;
      }

      return new Axios({
        method,
        url,
        data,
        headers
      })
        .then(res => {
          dispatch(requestDataSuccess(res.data));
          dispatch(onSuccess(res.data));
          return res.data;
        })
        .catch(error => {
          console.log(error);
          dispatch(requestDataFailure(error));
          return dispatch(onFailure(error));
        });
    } catch (error) {
      return dispatch(onFailure(error));
    }
  };
}

export function getData(
  url,
  tokenPath = null,
  onSuccess = () => {},
  onFailure = null
) {
  return requestData(url, "get", null, onSuccess, onFailure, tokenPath);
}

export function postData(
  url,
  data,
  tokenPath = null,
  onSuccess = () => {},
  onFailure = null
) {
  return requestData(url, "post", data, onSuccess, onFailure, tokenPath);
}

export function postBinaryData(
  url,
  data,
  type,
  tokenPath = null,
  onSuccess = () => {},
  onFailure = null
) {
  return requestData(url, "post", data, onSuccess, onFailure, tokenPath, type);
}

export function putData(
  url,
  data,
  tokenPath = null,
  onSuccess = () => {},
  onFailure = null
) {
  return requestData(url, "put", data, onSuccess, onFailure, tokenPath);
}

export function deleteData(
  url,
  data,
  tokenPath = null,
  onSuccess = () => {},
  onFailure = null
) {
  return requestData(url, "delete", data, onSuccess, onFailure, tokenPath);
}
