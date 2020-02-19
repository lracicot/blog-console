import * as Actions from "./post.actions";
import { postTypes } from "../consts";
import {
  getProtectedData,
  putProtectedData,
  postProtectedData,
  deleteProtectedData
} from "./data.creators";

export function retreivePosts() {
  return getProtectedData(
    postTypes.POSTS_API.LIST_POSTS_URL(),
    ["profile", "idToken"],
    Actions.retreivePostsSuccess,
    Actions.retreivePostsFailure
  );
}

export function retreivePost(uuid) {
  return getProtectedData(
    postTypes.POSTS_API.RETREIVE_POST_URL(uuid),
    ["profile", "idToken"],
    Actions.retreivePostSuccess,
    Actions.retreivePostFailure
  );
}

export function updatePost(uuid, data) {
  return dispatch => {
    dispatch(Actions.updatePostsRequest(uuid));
    dispatch(
      putProtectedData(
        postTypes.POSTS_API.UPDATE_POST_URL(uuid),
        data,
        ["profile", "idToken"],
        Actions.updatePostsSuccess,
        Actions.updatePostsFailure
      )
    );
  };
}

export function createPost(data) {
  return dispatch => {
    dispatch(Actions.createPostsRequest());
    dispatch(
      postProtectedData(
        postTypes.POSTS_API.CREATE_POST_URL(),
        data,
        ["profile", "idToken"],
        Actions.createPostsSuccess,
        Actions.createPostsFailure,
        data => `/post/${data.uuid}/edit`
      )
    );
  };
}

export function publishPost(uuid) {
  return dispatch => {
    dispatch(Actions.publishPostsRequest(uuid));
    dispatch(
      postProtectedData(
        postTypes.POSTS_API.PUBLISH_POST_URL(uuid),
        {},
        ["profile", "idToken"],
        Actions.publishPostsSuccess,
        Actions.publishPostsFailure
      )
    );
  };
}

export function archivePost(uuid) {
  return dispatch => {
    dispatch(Actions.archivePostsRequest(uuid));
    dispatch(
      postProtectedData(
        postTypes.POSTS_API.ARCHIVE_POST_URL(uuid),
        {},
        ["profile", "idToken"],
        Actions.archivePostsSuccess,
        Actions.archivePostsFailure
      )
    );
  };
}

export function deletePost(uuid) {
  return dispatch => {
    dispatch(Actions.deletePostsRequest(uuid));
    dispatch(
      deleteProtectedData(
        postTypes.POSTS_API.DELETE_POST_URL(uuid),
        {},
        ["profile", "idToken"],
        Actions.deletePostsSuccess,
        Actions.deletePostsFailure,
        () => `/`
      )
    );
  };
}
