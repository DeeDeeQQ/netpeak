import { takeLatest, call, put, all } from "redux-saga/effects";
import axios from "axios";

export function* watcherSaga() {
  yield takeLatest("API_CALL_REQUEST_LIST", workerSagaList);
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
    yield put({ type: "API_CALL_SUCCESS", data });
  } catch (error) {
    yield put({ type: "API_CALL_FAILURE", error });
  }
}
