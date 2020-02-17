import { combineReducers } from "redux-immutablejs";
import { reducer as forms } from "redux-form/immutable";
import * as auth from "./auth";
import app from "./app";

export default combineReducers({ app, form: forms, ...auth });
