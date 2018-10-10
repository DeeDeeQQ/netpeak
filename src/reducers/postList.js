export default function postList(state = [], action) {
  if (action.type === "GET_NEW_POSTS") {
    console.log(action);
    return state;
  }
  return state;
}
