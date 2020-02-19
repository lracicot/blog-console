import { fromJS } from "immutable";
import { postTypes as Action } from "../consts";

export function retreivePostsSuccess(posts) {
  return {
    type: Action.RETREIVE_POSTS_SUCCESS,
    data: fromJS(posts)
  };
}

export function retreivePostsFailure(error) {
  return {
    type: Action.RETREIVE_POSTS_FAILURE,
    error: fromJS(error)
  };
}

export function retreivePostSuccess(post) {
  return {
    type: Action.RETREIVE_POST_SUCCESS,
    data: fromJS(post)
  };
}

export function retreivePostFailure(error) {
  return {
    type: Action.RETREIVE_POST_FAILURE,
    error: fromJS(error)
  };
}

export function updatePostsRequest(uuid) {
  return {
    type: Action.UPDATE_POST_REQUEST,
    data: uuid
  };
}

export function updatePostsSuccess(posts) {
  return {
    type: Action.UPDATE_POST_SUCCESS,
    data: fromJS(posts)
  };
}

export function updatePostsFailure(error) {
  return {
    type: Action.UPDATE_POST_FAILURE,
    error: fromJS(error)
  };
}

export function createPostsRequest() {
  return {
    type: Action.CREATE_POST_REQUEST
  };
}

export function createPostsSuccess(post) {
  return {
    type: Action.CREATE_POST_SUCCESS,
    data: fromJS(post)
  };
}

export function createPostsFailure(error) {
  return {
    type: Action.CREATE_POST_FAILURE,
    error: fromJS(error)
  };
}

export function publishPostsRequest(uuid) {
  return {
    type: Action.PUBLISH_POST_REQUEST,
    data: uuid
  };
}

export function publishPostsSuccess(post) {
  return {
    type: Action.PUBLISH_POST_SUCCESS,
    data: fromJS(post)
  };
}

export function publishPostsFailure(error) {
  return {
    type: Action.PUBLISH_POST_FAILURE,
    error: fromJS(error)
  };
}

export function archivePostsRequest(uuid) {
  return {
    type: Action.ARCHIVE_POST_REQUEST,
    data: uuid
  };
}

export function archivePostsSuccess(post) {
  return {
    type: Action.ARCHIVE_POST_SUCCESS,
    data: fromJS(post)
  };
}

export function archivePostsFailure(error) {
  return {
    type: Action.ARCHIVE_POST_FAILURE,
    error: fromJS(error)
  };
}

export function deletePostsRequest(uuid) {
  return {
    type: Action.DELETE_POST_REQUEST,
    data: uuid
  };
}

export function deletePostsSuccess(post) {
  return {
    type: Action.DELETE_POST_SUCCESS,
    data: fromJS(post)
  };
}

export function deletePostsFailure(error) {
  return {
    type: Action.DELETE_POST_FAILURE,
    error: fromJS(error)
  };
}
