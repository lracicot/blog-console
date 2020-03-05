import * as Actions from "./post.actions";
import { postTypes } from "../consts";
import history from "../history";
import { getData, putData, postData, deleteData } from "./app.creators";

export function retreivePosts() {
  return getData(
    postTypes.POSTS_API.LIST_POSTS_URL(),
    ["profile", "idToken"],
    Actions.retreivePostsSuccess,
    Actions.retreivePostsFailure
  );
}

export function retreivePost(uuid) {
  return getData(
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
      putData(
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
      postData(
        postTypes.POSTS_API.CREATE_POST_URL(),
        data,
        ["profile", "idToken"],
        Actions.createPostsSuccess,
        Actions.createPostsFailure
      )
    ).then(data => history.push(`/post/${data.uuid}/edit`));
  };
}

export function publishPost(uuid) {
  return dispatch => {
    dispatch(Actions.publishPostsRequest(uuid));
    dispatch(
      postData(
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
      postData(
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
      deleteData(
        postTypes.POSTS_API.DELETE_POST_URL(uuid),
        {},
        ["profile", "idToken"],
        Actions.deletePostsSuccess,
        Actions.deletePostsFailure
      ).then(() => history.push(`/`))
    );
  };
}
