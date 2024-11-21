import { createStore, combineReducers } from "redux";

const initialState = {
  sourceUrls: [
    "https://www.reddit.com/r/animescreenshots.json?limit=700",
    "https://www.reddit.com/r/animescenery.json?limit=700",
  ],
};

const rootReducer = combineReducers({
  sourceUrls: (state = initialState.sourceUrls, { type, payload }) =>
    type === "SET_SOURCE_URLS" ? payload : state,
  imageData: (state = [], { type, payload }) =>
    type === "SET_IMAGE_DATA" ? payload : state,
});

const store = createStore(rootReducer);

export default store;
