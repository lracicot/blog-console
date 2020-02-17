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
