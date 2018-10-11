import { takeLatest, call, put, all } from "redux-saga/effects";
import axios from "axios";

export function* watcherSaga() {
  yield takeLatest("API_CALL_REQUEST_LIST", workerSagaList);
  yield takeLatest("API_CALL_REQUEST_POST", workerSagaPost);
}

function getList() {
  return axios({
    method: "get",
    url: "https://jsonplaceholder.typicode.com/posts"
  });
}

function* workerSagaList() {
  try {
    const response = yield call(getList);
    const data = response.data;
    yield put({ type: "API_CALL_SUCCESS_LIST", data });
  } catch (error) {
    yield put({ type: "API_CALL_FAILURE_LIST", error });
  }
}

function getPost(id) {
  return axios({
    method: "get",
    url: `https://jsonplaceholder.typicode.com/posts/${id}`
  });
}

function getUser(id) {
  return axios({
    method: "get",
    url: `https://jsonplaceholder.typicode.com/users/${id}`
  });
}

function getComments(id) {
  return axios({
    method: "get",
    url: `https://jsonplaceholder.typicode.com/posts/${id}/comments`
  });
}

function* workerSagaPost(action) {
  try {
    const { postResponse, commentsResponse } = yield all({
      postResponse: call(getPost, action.payload),
      commentsResponse: call(getComments, action.payload)
    });
    const post = postResponse.data;
    const comments = commentsResponse.data;

    const userId = post.userId;
    const userResponse = yield call(getUser, userId);
    const user = userResponse.data;

    const data = { post, comments, user };
    console.log(data);

    yield put({ type: "API_CALL_SUCCESS_POST", data });
  } catch (error) {
    yield put({ type: "API_CALL_FAILURE_POST", error });
  }
}
