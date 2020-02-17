import { fromJS } from "immutable";

const SWITCH_USER = "SWITCH_USER";
const UPDATE_PROFILE = "UPDATE_PROFILE";
const DELETE_PROFILE = "DELETE_PROFILE";

// when user sign in / out
function switchUser(user) {
  return {
    type: SWITCH_USER,
    user: fromJS(user)
  };
}

// when user update profile
function updateProfile(profile) {
  return {
    type: UPDATE_PROFILE,
    profile: fromJS(profile)
  };
}

function profileError(error) {
  return {
    type: "PROFILE_ERROR",
    error: fromJS(error)
  };
}

function userError(error) {
  return {
    type: "USER_ERROR",
    error: fromJS(error)
  };
}

// when user sign out
function deleteProfile() {
  return { type: DELETE_PROFILE };
}

export { SWITCH_USER, UPDATE_PROFILE, DELETE_PROFILE };
export { switchUser, updateProfile, deleteProfile, profileError, userError };
