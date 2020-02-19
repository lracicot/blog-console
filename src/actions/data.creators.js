import Axios from "axios";
import history from "../history";
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
  tokenPath = null,
  redirect = null
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
          const action = dispatch(onSuccess(res.data));
          if (redirect) {
            history.push(redirect(res.data));
          }
          return action;
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

export function getData(
  url,
  onSuccess,
  onFailure = requestDataFailure,
  redirect = null
) {
  return requestData(url, "get", null, onSuccess, onFailure, null, redirect);
}

export function postData(
  url,
  data,
  onSuccess,
  onFailure = requestDataFailure,
  redirect = null
) {
  return requestData(url, "post", data, onSuccess, onFailure, null, redirect);
}

export function deleteData(
  url,
  id,
  onSuccess,
  onFailure = requestDataFailure,
  redirect = null
) {
  return requestData(
    url,
    "delete",
    { id },
    onSuccess,
    onFailure,
    null,
    redirect
  );
}

export function putData(
  url,
  data,
  onSuccess,
  onFailure = requestDataFailure,
  redirect = null
) {
  return requestData(url, "put", data, onSuccess, onFailure, null, redirect);
}

export function getProtectedData(
  url,
  tokenPath,
  onSuccess,
  onFailure = requestDataFailure,
  redirect = null
) {
  return requestData(
    url,
    "get",
    null,
    onSuccess,
    onFailure,
    tokenPath,
    redirect
  );
}

export function postProtectedData(
  url,
  data,
  tokenPath,
  onSuccess,
  onFailure = requestDataFailure,
  redirect = null
) {
  return requestData(
    url,
    "post",
    data,
    onSuccess,
    onFailure,
    tokenPath,
    redirect
  );
}

export function putProtectedData(
  url,
  data,
  tokenPath,
  onSuccess,
  onFailure = requestDataFailure,
  redirect = null
) {
  return requestData(
    url,
    "put",
    data,
    onSuccess,
    onFailure,
    tokenPath,
    redirect
  );
}

export function deleteProtectedData(
  url,
  data,
  tokenPath,
  onSuccess,
  onFailure = requestDataFailure,
  redirect = null
) {
  return requestData(
    url,
    "delete",
    data,
    onSuccess,
    onFailure,
    tokenPath,
    redirect
  );
}
