const initialState = "";

export default function filter(state = initialState, action) {
  if (action.type === "FILTER_REQUEST") {
    return action.payload;
  }
  return state;
}
