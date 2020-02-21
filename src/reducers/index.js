import { combineReducers } from "redux-immutablejs";
import { reducer as forms } from "redux-form/immutable";
import * as auth from "./auth";
import app from "./app";
import post from "./post";
import asset from "./asset";

export default combineReducers({ app, post, asset, form: forms, ...auth });
