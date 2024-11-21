import { createStore, combineReducers } from "redux";

const sourceUrlsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_SOURCE_URLS":
      return action.payload;
    default:
      return state;
  }
};

const imageDataReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_IMAGE_DATA":
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  sourceUrls: sourceUrlsReducer,
  imageData: imageDataReducer,
});

const store = createStore(rootReducer);

export default store;