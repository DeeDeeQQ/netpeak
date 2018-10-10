import { takeLatest, call, put } from "redux-saga/effects";

export function* watcherSaga() {
  yield takeLatest("GET_NEW_POSTS", workerSaga);
}

function* workerSaga() {
  try {
    console.log(1);
    // dispatch a success action to the store with the new dog
    yield console.log(2);
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: "API_CALL_FAILURE", error });
  }
}
