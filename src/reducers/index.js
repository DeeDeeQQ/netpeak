import { combineReducers } from "redux";
import postList from "./postList";
import post from "./post";
import filter from "./filter";

export default combineReducers({
  postList,
  post,
  filter
});
