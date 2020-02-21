import { Map, fromJS } from "immutable";
import { postTypes as postAction } from "../consts";
import moment from "moment";

const sortPostOrder = fromJS(["draft", "published", "archived"]);

const sortPosts = posts =>
  posts.sort((post1, post2) => {
    if (
      sortPostOrder.findIndex(status => status === post1.get("status")) <
      sortPostOrder.findIndex(status => status === post2.get("status"))
    )
      return -1;
    if (
      sortPostOrder.findIndex(status => status === post1.get("status")) >
      sortPostOrder.findIndex(status => status === post2.get("status"))
    )
      return 1;
    if (moment(post1.get("created_at")).isAfter(post2.get("created_at")))
      return -1;
    else return 1;
  });

const updatePost = (posts, postData) =>
  posts.update(
    posts.findIndex(item => item.get("uuid") === postData.get("uuid")),
    () => postData
  );

export default function(state = Map(), action) {
  switch (action.type) {
    case postAction.CREATE_POST_REQUEST:
      return state.merge({
        isCreating: true
      });
    case postAction.CREATE_POST_FAILURE:
      return state.merge({
        isCreating: false,
        error: action.error.toString()
      });
    case postAction.CREATE_POST_SUCCESS:
      return state.merge({
        isCreating: false,
        posts: sortPosts(state.get("posts").push(action.data))
      });
    case postAction.RETREIVE_POSTS_SUCCESS:
      return state.set("posts", sortPosts(action.data));
    case postAction.RETREIVE_POSTS_FAILURE:
      return state.merge({ error: action.error.toString() });
    case postAction.RETREIVE_POST_SUCCESS:
      return state.set(
        "currentPost",
        action.data.has("content")
          ? action.data.set("content", JSON.parse(action.data.get("content")))
          : action.data
      );
    case postAction.RETREIVE_POST_FAILURE:
      return state.merge({ error: action.error.toString() });
    case postAction.UPDATE_POST_REQUEST:
      return state.merge({
        isSaving: true
      });
    case postAction.UPDATE_POST_SUCCESS:
      return state.merge({
        isSaving: false,
        currentPost: action.data.has("content")
          ? action.data.set("content", JSON.parse(action.data.get("content")))
          : action.data,
        posts: updatePost(state.get("posts"), action.data)
      });
    case postAction.UPDATE_POST_FAILURE:
      return state.merge({
        isSaving: false,
        error: action.error.toString()
      });
    case postAction.PUBLISH_POST_REQUEST:
      return state.merge({
        isPublishing: true
      });
    case postAction.PUBLISH_POST_SUCCESS:
      return state.merge({
        isPublishing: false,
        currentPost: action.data.has("content")
          ? action.data.set("content", JSON.parse(action.data.get("content")))
          : action.data,
        posts: updatePost(state.get("posts"), action.data)
      });
    case postAction.PUBLISH_POST_FAILURE:
      return state.merge({
        isPublishing: false,
        error: action.error.toString()
      });
    case postAction.ARCHIVE_POST_REQUEST:
      return state.merge({
        isArchiving: true
      });
    case postAction.ARCHIVE_POST_SUCCESS:
      return state.merge({
        isArchiving: false,
        currentPost: action.data.has("content")
          ? action.data.set("content", JSON.parse(action.data.get("content")))
          : action.data,
        posts: updatePost(state.get("posts"), action.data)
      });
    case postAction.ARCHIVE_POST_FAILURE:
      return state.merge({
        isArchiving: false,
        error: action.error.toString()
      });
    case postAction.DELETE_POST_REQUEST:
      return state.merge({
        isDeleting: true
      });
    case postAction.DELETE_POST_SUCCESS:
      return state.merge({
        isDeleting: false,
        posts: state
          .get("posts")
          .delete(
            state
              .get("posts")
              .findIndex(item => item.get("uuid") === action.data.get("uuid"))
          )
      });
    case postAction.DELETE_POST_FAILURE:
      return state.merge({
        isDeleting: false,
        error: action.error.toString()
      });
    default:
      return state;
  }
}
