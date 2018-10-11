import { combineReducers } from "redux";
import postList from "./postList";
import post from "./post";

export default combineReducers({
  postList,
  post
});
