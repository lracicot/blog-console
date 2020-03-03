import Axios from "axios";
import history from "../history";
import {
  requestDataStart,
  requestDataFailure,
  requestDataSuccess
} from "./data.actions";

export function requestData(
  url,
  method,
  data,
  onSuccess,
  onFailure,
  tokenPath = null,
  redirect = null,
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
          if (redirect) {
            history.push(redirect(res.data));
          }
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

export function getData(url, onSuccess, onFailure = null, redirect = null) {
  return requestData(url, "get", null, onSuccess, onFailure, null, redirect);
}

export function postData(
  url,
  data,
  onSuccess,
  onFailure = null,
  redirect = null
) {
  return requestData(url, "post", data, onSuccess, onFailure, null, redirect);
}

export function deleteData(
  url,
  id,
  onSuccess,
  onFailure = null,
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
  onFailure = null,
  redirect = null
) {
  return requestData(url, "put", data, onSuccess, onFailure, null, redirect);
}

export function getProtectedData(
  url,
  tokenPath,
  onSuccess,
  onFailure = null,
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
  onFailure = null,
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

export function postBinaryData(
  url,
  data,
  type,
  tokenPath,
  onSuccess,
  onFailure = null,
  redirect = null
) {
  return requestData(
    url,
    "post",
    data,
    onSuccess,
    onFailure,
    tokenPath,
    redirect,
    type
  );
}

export function putProtectedData(
  url,
  data,
  tokenPath,
  onSuccess,
  onFailure = null,
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
  onFailure = null,
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
