import Axios from "axios";
/* eslint-disable func-style */
/* eslint-disable max-params */

/* * * * * * * * * * * * * * *
 * Actions
 * * * * * * * * * * * * * * */

export function requestDataStart(url) {
  return {
    type: "REQUEST_DATA_START",
    url
  };
}

export function requestDataFailure(error) {
  return {
    type: "REQUEST_DATA_FAILURE",
    error
  };
}

export function requestDataSuccess(data) {
  return {
    type: "REQUEST_DATA_SUCCESS",
    data
  };
}

/* * * * * * * * * * * * * * *
 * Action creators
 * * * * * * * * * * * * * * */

export function requestData(
  url,
  method,
  data,
  onSuccess,
  onFailure,
  tokenPath = null
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

      return new Axios({
        method,
        url,
        data,
        headers
      })
        .then(res => {
          return dispatch(onSuccess(res.data));
        })
        .catch(error => {
          console.log(error);
          return dispatch(onFailure(error));
        });
    } catch (error) {
      return dispatch(onFailure(error));
    }
  };
}

export function getData(url, onSuccess, onFailure = requestDataFailure) {
  return requestData(url, "get", null, onSuccess, onFailure);
}

export function postData(url, data, onSuccess, onFailure = requestDataFailure) {
  return requestData(url, "post", data, onSuccess, onFailure);
}

export function deleteData(url, id, onSuccess, onFailure = requestDataFailure) {
  return requestData(url, "delete", { id }, onSuccess, onFailure);
}

export function putData(url, data, onSuccess, onFailure = requestDataFailure) {
  return requestData(url, "put", data, onSuccess, onFailure);
}

export function getProtectedData(
  url,
  tokenPath,
  onSuccess,
  onFailure = requestDataFailure
) {
  return requestData(url, "get", null, onSuccess, onFailure, tokenPath);
}

export function postProtectedData(
  url,
  data,
  tokenPath,
  onSuccess,
  onFailure = requestDataFailure
) {
  return requestData(url, "post", data, onSuccess, onFailure, tokenPath);
}

export function putProtectedData(
  url,
  data,
  tokenPath,
  onSuccess,
  onFailure = requestDataFailure
) {
  return requestData(url, "put", data, onSuccess, onFailure, tokenPath);
}
